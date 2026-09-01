import supabase from '../config/db.js'

// Crear un enlace
const createLink = async (originalUrl, shortUrl, userId, guestId) => {
  const { data, error } = await supabase
    .from('links')
    .insert([
      {
        original_url: originalUrl,
        short_url: shortUrl,
        user_id: userId,
        guest_id: guestId,
      },
    ])
    .select('id, short_url')

  if (error) {
    throw error
  }

  return data
}

// Vincular links con guestId al usuario
const linkGuestLinksToUser = async (guestId, userId) => {
  const { data, error } = await supabase
    .from('links')
    .update({ user_id: userId, guest_id: null })
    .eq('guest_id', guestId)

    if (error){
      throw new Error('Error linking guest links to user: ' + error.message)
    }

    return data
}

// Recuperar enlaces de un usuario
const getLinksByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    throw new Error('Error fetching links: ' + error.message)
  }

  return data
}

// recuperar enlaces para exportar
const getLinksToExport = async (userId) => {
  const { data, error } = await supabase
    .from('links')
    .select('original_url, short_url')
    .eq('user_id', userId)

  if (error) {
    throw new Error('Error fetching links for export: ' + error.message)
  }

  return data
}

// Buscar un enlace
const searchLink = async (findShortUrl) => {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .ilike('short_url', `%${findShortUrl}%`) //<-Busca coincidencias parciales ignorando mayúsculas/minúsculas

  if (error) {
    throw new Error('Error fetching link: ' + error.message)
  }

  return data
}

// Editar un enlace
const updateLink = async (linkId, newShortUrl) => {
  const { data, error } = await supabase
    .from('links')
    .update({ short_url: newShortUrl })
    .eq('id', linkId)
    .select()

  if (error) {
    throw new Error('Error updating link: ' + error.message)
  }

  return data ? data[0] : null
}

// Eliminar un enlace
const deleteLink = async (linkId) => {
  const { data, error } = await supabase.from('links').delete().eq('id', linkId)

  if (error) {
    throw new Error('Error deleting link: ' + error.message)
  }

  return data
}

// Eliminar usuario con todos sus links
const deleteUserOnCascade = async (userId) => {
  try {
    const { error: linksError } = await supabase
      .from('links')
      .delete()
      .eq('user_id', userId)

    if (linksError) {
      throw new Error('Error deleting Links: ' + linksError.message)
    }

    const { error: userError } = await supabase.auth.admin.deleteUser(userId)

    if (userError) {
      throw new Error('Error deleting user: ' + userError.message)
    }

    ;('User deleted successfully') // Log si el usuario se elimina correctamente

    return { message: 'User and associated links deleted successfully' }
  } catch (error) {
    console.error('Error in deleteUserOnCascade:', error)
    throw new Error('Error in deleteUserOnCascade: ' + error.message)
  }
}

// Redireccion de shortUrl a originalUrl
const redirectLink = async (shortUrl) => {
  const { data, error } = await supabase
    .from('links')
    .select('original_url')
    .eq('short_url', shortUrl)
    .single()

  if (error) {
    throw new Error('Error geting links: ' + error.message)
  }

  return data ? data.original_url : null
}

export {
  createLink,
  linkGuestLinksToUser,
  getLinksByUserId,
  getLinksToExport,
  searchLink,
  updateLink,
  deleteLink,
  deleteUserOnCascade,
  redirectLink,
}

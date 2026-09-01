import supabase from '../config/db.js'
import {
  createLink,
  linkGuestLinksToUser,
  getLinksByUserId,
  getLinksToExport,
  searchLink,
  updateLink,
  deleteLink,
  deleteUserOnCascade,
  redirectLink,
} from '../models/Link.js'
import { v4 as uuidv4 } from 'uuid'

// Crear un enlace
const createLinkController = async (req, res) => {
  const { originalUrl, shortUrl, userId, guestId } = req.body
  const finalUserId = userId ?? null
  const generatedShortUrl = shortUrl || uuidv4().slice(0, 8) // Si no se proporciona shortUrl, generamos uno por defecto

  try {
    // Hacemos la inserción
    const data = await createLink(originalUrl, generatedShortUrl, finalUserId, guestId)

    // Si no hay datos
    if (!data || data.length === 0) {
      return res.status(400).json({
        message: 'Error creating link: No data returned from database',
      })
    }

    // Devolvemos el short_url
    res.status(201).json({
      message: 'Link created successfully',
      link: data[0].short_url,
      userId: finalUserId,
    })
  } catch (error) {
    console.error('Supabase error:', error)

    if (error.code === '23505') {
      return res.status(409).json({
        message: 'El shortUrl ya está en uso. Prueba con otro.',
        code: 'DUPLICATE_SHORTURL',
      })
    }

    res.status(500).json({
      message: 'Error creando el enlace',
      detail: error.message,
    })
  }
}

// Vincular guestId al usuario logeado
const linkGuestLinksToUserController = async (req, res) => {
  const {guestId} = req.body
  const userId = req.userId

  if(!guestId) {
    return res.status(400).json({message: 'guestId is required'})
  }

  try {
    const updatedLinks = await linkGuestLinksToUser(guestId, userId)
  } catch (error) {
    console.error('Error linking guest links to user: ', error)
    res.status(500).json({
      message: 'Failed to link links to user',
      detail: error.message,
    })
  }
}


// Recuperar enlaces de un usuario
const getLinksByUserIdController = async (req, res) => {
  const userId = req.userId

  try {
    const links = await getLinksByUserId(userId)
    res.status(200).json(links)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching links: ' + error.message })
  }
}

// Recuperar enlaces para exportar
const getLinksToExportController = async (req, res) => {
  const userId = req.userId

  try {
    const linksToExport = await getLinksToExport(userId)
    res.status(200).json(linksToExport)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching links: ' + error.message })
  }
}

// Buscar un link
const searchLinkController = async (req, res) => {
  const { findShortUrl } = req.query

  if (!findShortUrl) {
    return res.status(400).json({ message: 'Query parameter is required' })
  }

  try {
    const link = await searchLink(findShortUrl)
    if (link.length === 0) {
      return res
        .status(400)
        .json({ message: 'No link found matching the search term' })
    }
    res.status(200).json(link)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching link: ' + error.message })
  }
}

// Editar un enlace
const updateLinkController = async (req, res) => {
  const { linkId } = req.params
  const { newShortUrl } = req.body
  const authenticatedUserId = req.userId

  // Formato del shortlink
  const shortUrlPattern = /^[a-zA-Z0-9\-]+$/

  if (!shortUrlPattern.test(newShortUrl)) {
    return res.status(400).json({
      message:
        'Invalid short URL format. It should only contain alphanumeric characters and hyphens.',
    })
  }

  try {
    const { data, error } = await supabase
      .from('links')
      .select('user_id')
      .eq('id', linkId)
      .single()

    if (error || !data) {
      return res.status(404).json({ message: 'Link not found' })
    }

    if (data.user_id !== authenticatedUserId) {
      return res.status(403).json({
        message: "You don't have permission to edit this link.",
      })
    }

    const updatedLink = await updateLink(linkId, newShortUrl)
    res.status(200).json({
      original_url: updatedLink.original_url,
      short_url: updatedLink.short_url,
    })
  } catch (error) {
    res.status(500).json({ message: 'Error updating link: ' + error.message })
  }
}

// Eliminar un enlace
const deleteLinkController = async (req, res) => {
  const { linkId } = req.params

  try {
    await deleteLink(linkId)
    res.status(200).json({ message: 'Link deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting link: ' + error.message })
  }
}

// Eliminar usuario en cascada
const deleteUserOnCascadeController = async (req, res) => {
  const userId = req.userId



  try {
    const result = await deleteUserOnCascade(userId)
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error in deleteUserOnCascadeController:', error); // Log del error
    res.status(500).json({ message: 'Error fetching links: ' + error.message })
  }
}

// Redireccion de shortUrl a originalUrl
const redirectLinkController = async (req, res) => {
  const { shortUrl } = req.params

  try {
    const originalUrl = await redirectLink(shortUrl)

    if (!originalUrl) {
      res.status(404).send('Redirection not found') //!!<- Aqui ira la pagina HTML de error!!
    }

    res.redirect(originalUrl)
  } catch (error) {
    res.status(500).send('Server error: ' + error.message)
  }
}

export {
  createLinkController,
  linkGuestLinksToUserController,
  getLinksByUserIdController,
  getLinksToExportController,
  searchLinkController,
  updateLinkController,
  deleteLinkController,
  deleteUserOnCascadeController,
  redirectLinkController,
}

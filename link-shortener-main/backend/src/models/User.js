import supabase from '../config/db.js'

// Crear un nuevo usuario
const createUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw new Error('Error creating user: ' + error.message)
  }

  return data.user
}

// Recuperar usuario por email
const signInUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error('Error fetching user: ' + error.message)
  }

  return data.user
}

export { createUser, signInUser }

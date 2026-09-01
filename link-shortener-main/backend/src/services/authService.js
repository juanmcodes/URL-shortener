import { createUser, signInUser } from '../models/User.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// Registrar un nuevo usuario
const authRegisterUser = async (email, password) => {
  try {
    // Crear nuevo usuario
    const newUser = await createUser(email, password)

    // Generar token para el nuevo usuario
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    return { message: 'User created successfully', token, userId: newUser.id }
  } catch (error) {
    throw new Error(`Error in registerUser: ${error.message}`)
  }
}

// Iniciar sesion
const authLoginUser = async (email, password) => {
  
  try {
    // Buscar usuario por email
    const user = await signInUser(email, password)
    if (!user) {
      throw new Error('Invalid login credentials')
    }

    //Generar un token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    return { message: 'Login successful', token, userId: user.id }
  } catch (error) {
    throw new Error(`Error in loginUser: ${error.message}`)
  }
}

export { authRegisterUser, authLoginUser }

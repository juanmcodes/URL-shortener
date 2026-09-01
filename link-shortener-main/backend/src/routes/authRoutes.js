import express from 'express'
import { registerUser, loginUser } from '../controllers/authController.js'

const router = express.Router()

// Registr usuario
router.post('/register', registerUser)

// Login usuario
router.post('/login', loginUser)

export default router
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authenticateToken = (req, res, next) => {
  // Obtener el token de la cabecera Authorization, en formato Bearer <token>
  const token = req.header('Authorization')?.replace('Bearer ', '')

  // Si no hay token denegar el acceso
  if (!token) {
    return res.status(401).json({ error: 'Access denied' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.userId

    next()
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' })
  }
}

export { authenticateToken }

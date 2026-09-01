import { jwtVerify } from 'jose'
import dotenv from 'dotenv'

dotenv.config()

const SECRET = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET)

export async function verifySupabaseToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {

    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const { payload } = await jwtVerify(token, SECRET)
    req.userId = payload.sub
    next()
  } catch (err) {
    console.error('Token verification failed:', err)
    return res.status(403).json({ error: 'Invalid Supabase token' })
  }
}

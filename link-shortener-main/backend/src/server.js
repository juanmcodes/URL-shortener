import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import linkRoutes from './routes/linkRoutes.js'
import { redirectLinkController } from './controllers/linkController.js'

// Cargar variable de entorno
dotenv.config()

// Inicializar Express
const app = express()

//Middlewares
app.use(cors({
  origin: ['https://craftit.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
})
)
app.use(morgan('dev'))
app.use(express.json())

// Rutas
app.get('/', (req, res) => {
  res.send('Server is running...')
})

// Redireccion a originalUrl
app.get('/:shortUrl', redirectLinkController)

// Ruta de autenticación
app.use('/auth', authRoutes)

// Ruta de enlaces
app.use('/links', linkRoutes)

// Puerto
const PORT = process.env.PORT ?? 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

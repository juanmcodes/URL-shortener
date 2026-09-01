import express from 'express'
import {
  createLinkController,
  linkGuestLinksToUserController,
  getLinksByUserIdController,
  getLinksToExportController,
  searchLinkController,
  updateLinkController,
  deleteLinkController,
  deleteUserOnCascadeController,
} from '../controllers/linkController.js'
import { verifySupabaseToken } from '../middlewares/authSupabaseToken.js'

const router = express.Router()

// Crear link
router.post('/', createLinkController)

// Vincular guestId 
router.post('/link-guest-links', verifySupabaseToken, linkGuestLinksToUserController)

// Obtener links del user 
router.get('/my-links', verifySupabaseToken, getLinksByUserIdController)

// Obtener links para exportar
router.get('/export-links', verifySupabaseToken, getLinksToExportController)

// Buscar un link
router.get('/search-link', verifySupabaseToken, searchLinkController)

// Actualizar link
router.put('/:linkId', verifySupabaseToken, updateLinkController)

// Eliminar usuario
router.delete('/delete-user', verifySupabaseToken, deleteUserOnCascadeController)

// Eliminar link
router.delete('/:linkId', verifySupabaseToken, deleteLinkController)


export default router
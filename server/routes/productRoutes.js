import express from 'express'

import {
    getProducts,
    getDynamicImage,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js'

import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = express.Router()

// Public routes
router.get('/', getProducts)
router.get('/dynamic-image', getDynamicImage)
router.get('/:id', getProductById)

// Admin-only routes
router.post(
    '/',
    authMiddleware,
    adminMiddleware,
    createProduct
)

router.put(
    '/:id',
    authMiddleware,
    adminMiddleware,
    updateProduct
)

router.delete(
    '/:id',
    authMiddleware,
    adminMiddleware,
    deleteProduct
)

export default router
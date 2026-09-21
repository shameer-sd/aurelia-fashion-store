import express from 'express'

import {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    getAdminStats,
} from '../controllers/orderController.js'

import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = express.Router()

// Customer routes
router.post(
    '/',
    authMiddleware,
    createOrder
)

router.get(
    '/my-orders',
    authMiddleware,
    getMyOrders
)

router.get(
    '/admin/stats',
    authMiddleware,
    adminMiddleware,
    getAdminStats
)

router.get(
    '/:id',
    authMiddleware,
    getOrderById
)

// Admin routes
router.get(
    '/admin/all',
    authMiddleware,
    adminMiddleware,
    getAllOrders
)

router.put(
    '/admin/:id/status',
    authMiddleware,
    adminMiddleware,
    updateOrderStatus
)

export default router
import mongoose from 'mongoose'
import Order from '../models/Order.js'
import Product from '../models/Product.js'

export const createOrder = async (req, res) => {
    const session = await mongoose.startSession()

    try {
        const { items, shippingAddress } = req.body

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Order must contain at least one item',
            })
        }

        if (
            !shippingAddress ||
            !shippingAddress.fullName ||
            !shippingAddress.phone ||
            !shippingAddress.addressLine ||
            !shippingAddress.city ||
            !shippingAddress.state ||
            !shippingAddress.postalCode ||
            !shippingAddress.country
        ) {
            return res.status(400).json({
                success: false,
                message: 'Complete shipping address is required',
            })
        }

        let createdOrder

        await session.withTransaction(async () => {
            const orderItems = []
            let calculatedTotal = 0

            for (const item of items) {
                if (!item.product) {
                    throw new Error(
                        'Product ID is required for every item'
                    )
                }

                if (!mongoose.Types.ObjectId.isValid(item.product)) {
                    throw new Error('Invalid product ID')
                }

                if (
                    !Number.isInteger(item.quantity) ||
                    item.quantity <= 0
                ) {
                    throw new Error(
                        'Quantity must be a positive whole number'
                    )
                }

                const product = await Product.findById(
                    item.product
                ).session(session)

                if (!product) {
                    throw new Error(
                        `Product not found: ${item.product}`
                    )
                }

                if (product.stock < item.quantity) {
                    throw new Error(
                        `Not enough stock for ${product.name}. Available: ${product.stock}`
                    )
                }

                const subtotal =
                    product.price * item.quantity

                calculatedTotal += subtotal

                orderItems.push({
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity,
                })

                product.stock -= item.quantity

                await product.save({ session })
            }

            createdOrder = new Order({
                user: req.userId,

                shippingAddress: {
                    fullName: shippingAddress.fullName,
                    phone: shippingAddress.phone,
                    addressLine: shippingAddress.addressLine,
                    city: shippingAddress.city,
                    state: shippingAddress.state,
                    postalCode: shippingAddress.postalCode,
                    country: shippingAddress.country,
                },

                items: orderItems,
                totalAmount: calculatedTotal,
            })

            await createdOrder.save({ session })
        })

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order: createdOrder,
        })
    } catch (error) {
        console.error('Create order error:', error)

        res.status(400).json({
            success: false,
            message:
                error.message || 'Unable to create order',
        })
    } finally {
        await session.endSession()
    }
}

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.userId,
        }).sort({ createdAt: -1 })

        res.json({
            success: true,
            count: orders.length,
            orders,
        })
    } catch (error) {
        console.error('Get orders error:', error)

        res.status(500).json({
            success: false,
            message: 'Server error',
        })
    }
}

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid order ID',
            })
        }

        const order = await Order.findOne({
            _id: id,
            user: req.userId,
        })

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            })
        }

        res.json({
            success: true,
            order,
        })
    } catch (error) {
        console.error('Get order error:', error)

        res.status(500).json({
            success: false,
            message: 'Server error',
        })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })

        res.json({
            success: true,
            count: orders.length,
            orders,
        })
    } catch (error) {
        console.error('Get all orders error:', error)

        res.status(500).json({
            success: false,
            message: 'Server error',
        })
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body

        const allowedStatuses = [
            'pending',
            'confirmed',
            'shipped',
            'delivered',
            'cancelled',
        ]

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid order status',
            })
        }

        const order = await Order.findById(req.params.id)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            })
        }

        order.status = status

        await order.save()

        res.json({
            success: true,
            message: 'Order status updated successfully',
            order,
        })
    } catch (error) {
        console.error(
            'Update order status error:',
            error
        )

        res.status(500).json({
            success: false,
            message: 'Server error',
        })
    }
}

export const getAdminStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments()

        const revenueResult = await Order.aggregate([
            {
                $match: {
                    status: {
                        $ne: 'cancelled',
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: '$totalAmount',
                    },
                },
            },
        ])

        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0

        res.json({
            success: true,
            stats: {
                totalOrders,
                totalRevenue,
            },
        })
    } catch (error) {
        console.error(
            'Get admin stats error:',
            error
        )

        res.status(500).json({
            success: false,
            message: 'Server error',
        })
    }
}
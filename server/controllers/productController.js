import Product from '../models/Product.js'
import { resolveProductImage } from '../services/pexelsService.js'

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({
            createdAt: -1,
        })

        // Enhance products with dynamic image resolution if applicable
        const enhancedProducts = await Promise.all(
            products.map(async (product) => {
                const productObj = product.toObject()
                const dynamicImage = await resolveProductImage({
                    name: product.name,
                    category: product.category,
                    gender: product.gender,
                    existingImage: product.image,
                })

                return {
                    ...productObj,
                    image: dynamicImage || product.image,
                    dynamicImage: dynamicImage || product.image,
                }
            })
        )

        res.json({
            success: true,
            count: enhancedProducts.length,
            products: enhancedProducts,
        })
    } catch (error) {
        console.error('Get products error:', error)

        res.status(500).json({
            success: false,
            message: 'Server error',
        })
    }
}

export const getDynamicImage = async (req, res) => {
    try {
        const { name = '', category = '', gender = '', existingImage = '' } = req.query

        const imageUrl = await resolveProductImage({
            name,
            category,
            gender,
            existingImage,
        })

        res.json({
            success: true,
            imageUrl,
        })
    } catch (error) {
        console.error('Get dynamic image error:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to resolve dynamic image',
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            gender,
            category,
            price,
            image,
            description,
            stock,
        } = req.body

        if (
            !name ||
            !gender ||
            !category ||
            price === undefined ||
            !image
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'Name, gender, category, price and image are required',
            })
        }

        const product = await Product.create({
            name,
            gender,
            category,
            price,
            image,
            description,
            stock,
        })

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product,
        })
    } catch (error) {
        console.error('Create product error:', error)

        res.status(500).json({
            success: false,
            message: 'Server error',
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            })
        }

        const productObj = product.toObject()
        const dynamicImage = await resolveProductImage({
            name: product.name,
            category: product.category,
            gender: product.gender,
            existingImage: product.image,
        })

        res.json({
            success: true,
            product: {
                ...productObj,
                image: dynamicImage || product.image,
                dynamicImage: dynamicImage || product.image,
            },
        })
    } catch (error) {
        console.error('Get product error:', error)

        res.status(500).json({
            success: false,
            message: 'Server error',
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {
            name,
            gender,
            category,
            price,
            image,
            description,
            stock,
        } = req.body

        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            })
        }

        if (name !== undefined) {
            product.name = name
        }

        if (gender !== undefined) {
            product.gender = gender
        }

        if (category !== undefined) {
            product.category = category
        }

        if (price !== undefined) {
            product.price = price
        }

        if (image !== undefined) {
            product.image = image
        }

        if (description !== undefined) {
            product.description = description
        }

        if (stock !== undefined) {
            product.stock = stock
        }

        await product.save()

        res.json({
            success: true,
            message: 'Product updated successfully',
            product,
        })
    } catch (error) {
        console.error('Update product error:', error)

        res.status(500).json({
            success: false,
            message: 'Server error',
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            })
        }

        await product.deleteOne()

        res.json({
            success: true,
            message: 'Product deleted successfully',
        })
    } catch (error) {
        console.error('Delete product error:', error)

        res.status(500).json({
            success: false,
            message: 'Server error',
        })
    }
}
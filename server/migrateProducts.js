import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'

dotenv.config()

const migrateProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log('MongoDB connected')

        // Convert existing Women products
        await Product.updateMany(
            {
                category: 'Women',
            },
            {
                $set: {
                    gender: 'Women',
                    category: 'Clothing',
                },
            }
        )

        // Convert existing Men products
        await Product.updateMany(
            {
                category: 'Men',
            },
            {
                $set: {
                    gender: 'Men',
                    category: 'Clothing',
                },
            }
        )

        // Everything else is treated as Unisex
        await Product.updateMany(
            {
                category: {
                    $in: [
                        'Shoes',
                        'Watches',
                        'Glasses',
                        'Belts',
                        'Bags',
                        'Wallets',
                        'Perfume',
                    ],
                },
            },
            {
                $set: {
                    gender: 'Unisex',
                },
            }
        )

        console.log(
            'Product migration completed successfully.'
        )

        await mongoose.disconnect()
    } catch (error) {
        console.error(
            'Product migration failed:',
            error
        )

        await mongoose.disconnect()
        process.exit(1)
    }
}

migrateProducts()
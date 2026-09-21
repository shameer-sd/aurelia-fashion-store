import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'

dotenv.config()

const products = [
    // WOMEN — CLOTHING
    {
        name: 'Aurelia Signature Blazer',
        gender: 'Women',
        category: 'Clothing',
        price: 189,
        image: '/images/blazer.jpg',
        description:
            'A refined tailored blazer designed with a structured silhouette and premium finish.',
        stock: 25,
    },
    {
        name: 'Silk Evening Dress',
        gender: 'Women',
        category: 'Clothing',
        price: 249,
        image: '/images/dress.jpg',
        description:
            'An elegant silk evening dress with a timeless silhouette for sophisticated occasions.',
        stock: 15,
    },
    {
        name: 'Satin Wrap Dress',
        gender: 'Women',
        category: 'Clothing',
        price: 179,
        image: '/images/satin-wrap-dress.jpg',
        description:
            'A graceful satin wrap dress designed for effortless evening elegance.',
        stock: 18,
    },
    {
        name: 'Tailored Wide-Leg Trousers',
        gender: 'Women',
        category: 'Clothing',
        price: 119,
        image: '/images/wide-leg-trousers.jpg',
        description:
            'High-waisted wide-leg trousers with a polished tailored finish.',
        stock: 22,
    },
    {
        name: 'Cashmere Knit Sweater',
        gender: 'Women',
        category: 'Clothing',
        price: 159,
        image: '/images/cashmere-sweater.jpg',
        description:
            'A luxurious cashmere-inspired knit sweater with a soft and refined finish.',
        stock: 20,
    },

    // MEN — CLOTHING
    {
        name: 'Noir Tailored Shirt',
        gender: 'Men',
        category: 'Clothing',
        price: 129,
        image: '/images/shirt.jpg',
        description:
            'A sophisticated tailored shirt crafted for a clean and modern wardrobe.',
        stock: 30,
    },
    {
        name: 'Essential Linen Shirt',
        gender: 'Men',
        category: 'Clothing',
        price: 99,
        image: '/images/linen-shirt.jpg',
        description:
            'A lightweight linen shirt designed for relaxed luxury and everyday comfort.',
        stock: 37,
    },
    {
        name: 'Aurelia Wool Overcoat',
        gender: 'Men',
        category: 'Clothing',
        price: 299,
        image: '/images/wool-overcoat.jpg',
        description:
            'A premium wool overcoat with a clean silhouette and timeless construction.',
        stock: 12,
    },
    {
        name: 'Classic Tailored Trousers',
        gender: 'Men',
        category: 'Clothing',
        price: 139,
        image: '/images/tailored-trousers.jpg',
        description:
            'Modern tailored trousers with a sharp silhouette and versatile styling.',
        stock: 24,
    },
    {
        name: 'Merino Knit Polo',
        gender: 'Men',
        category: 'Clothing',
        price: 119,
        image: '/images/merino-polo.jpg',
        description:
            'A refined merino knit polo combining classic style with modern comfort.',
        stock: 20,
    },

    // SHOES
    {
        name: 'Aurelia Leather Loafers',
        gender: 'Unisex',
        category: 'Shoes',
        price: 179,
        image: '/images/leather-loafers.jpg',
        description:
            'Elegant leather loafers designed with a timeless profile and refined detailing.',
        stock: 16,
    },
    {
        name: 'Minimal Court Sneakers',
        gender: 'Unisex',
        category: 'Shoes',
        price: 149,
        image: '/images/court-sneakers.jpg',
        description:
            'Clean low-profile sneakers designed for understated everyday luxury.',
        stock: 25,
    },
    {
        name: 'Italian Chelsea Boots',
        gender: 'Unisex',
        category: 'Shoes',
        price: 229,
        image: '/images/chelsea-boots.jpg',
        description:
            'Sophisticated Chelsea boots with a sleek profile and premium-inspired finish.',
        stock: 14,
    },
    {
        name: 'Classic Formal Derby',
        gender: 'Unisex',
        category: 'Shoes',
        price: 199,
        image: '/images/formal-derby.jpg',
        description:
            'A timeless formal derby designed for polished business and evening looks.',
        stock: 18,
    },

    // ACCESSORIES
    {
        name: 'Aurelia Signature Watch',
        gender: 'Unisex',
        category: 'Watches',
        price: 279,
        image: '/images/signature-watch.jpg',
        description:
            'A sophisticated minimalist watch designed to complement a refined wardrobe.',
        stock: 10,
    },
    {
        name: 'Noir Square Sunglasses',
        gender: 'Unisex',
        category: 'Glasses',
        price: 129,
        image: '/images/square-sunglasses.jpg',
        description:
            'Contemporary square-frame sunglasses with an elegant understated profile.',
        stock: 20,
    },
    {
        name: 'Classic Leather Belt',
        gender: 'Unisex',
        category: 'Belts',
        price: 89,
        image: '/images/leather-belt.jpg',
        description:
            'A refined leather belt with a minimalist buckle and timeless design.',
        stock: 30,
    },
    {
        name: 'Aurelia Leather Tote',
        gender: 'Women',
        category: 'Bags',
        price: 219,
        image: '/images/leather-tote.jpg',
        description:
            'A spacious structured leather tote designed for sophisticated everyday use.',
        stock: 14,
    },
    {
        name: 'Signature Leather Wallet',
        gender: 'Unisex',
        category: 'Wallets',
        price: 79,
        image: '/images/leather-wallet.jpg',
        description:
            'A compact leather wallet combining practical organization with timeless style.',
        stock: 35,
    },

    // FRAGRANCE
    {
        name: 'Aurelia No. 01 Eau de Parfum',
        gender: 'Unisex',
        category: 'Perfume',
        price: 149,
        image: '/images/perfume-no1.jpg',
        description:
            'A sophisticated fragrance blending warm woods, subtle spice, and refined floral notes.',
        stock: 20,
    },
    {
        name: 'Aurelia No. 02 Eau de Parfum',
        gender: 'Unisex',
        category: 'Perfume',
        price: 159,
        image: '/images/perfume-no2.jpg',
        description:
            'An elegant modern fragrance with fresh citrus, soft florals, and warm amber notes.',
        stock: 18,
    },
]

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log('MongoDB connected')

        const existingNames = await Product.find(
            {
                name: {
                    $in: products.map(
                        (product) => product.name
                    ),
                },
            },
            {
                name: 1,
            }
        )

        const existingNameSet = new Set(
            existingNames.map(
                (product) => product.name
            )
        )

        const newProducts = products.filter(
            (product) =>
                !existingNameSet.has(product.name)
        )

        if (newProducts.length === 0) {
            console.log(
                'No new products to add. Catalog is already up to date.'
            )
        } else {
            await Product.insertMany(newProducts)

            console.log(
                `${newProducts.length} new AURELIA products added successfully.`
            )
        }

        await mongoose.disconnect()
    } catch (error) {
        console.error(
            'Product seed failed:',
            error
        )

        await mongoose.disconnect()
        process.exit(1)
    }
}

seedProducts()
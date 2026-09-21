/*
|--------------------------------------------------------------------------
| AURELIA DYNAMIC PEXELS IMAGE SERVICE
|--------------------------------------------------------------------------
| - Derives intelligent studio product photography queries
| - Caches image URLs in-memory to prevent repeated API calls
| - Preserves verified high-quality existing local assets
| - Provides seamless fallback if Pexels API key is absent or unreachable
|--------------------------------------------------------------------------
*/

// In-memory cache for resolved product images
const imageCache = new Map()

// Specific curated search queries for known AURELIA products
const SMART_SEARCH_QUERIES = {
    // Clothing - Women
    'Aurelia Signature Blazer': 'luxury tailored blazer studio product photography',
    'Silk Evening Dress': 'luxury black silk evening dress studio',
    'Satin Wrap Dress': 'elegant satin wrap dress luxury fashion studio',
    'Tailored Wide-Leg Trousers': 'high waisted wide leg trousers luxury fashion studio',
    'Cashmere Knit Sweater': 'cashmere knit sweater luxury studio product photography',
    'Evening Dress': 'luxury evening gown dress fashion studio',
    'Essential Crew Neck Tee': 'minimalist plain crew neck t-shirt luxury studio',

    // Clothing - Men
    'Noir Tailored Shirt': 'black tailored formal shirt luxury studio product photography',
    'Essential Linen Shirt': 'premium linen shirt studio product photography',
    'Aurelia Wool Overcoat': 'luxury wool overcoat coat fashion studio',
    'Classic Tailored Trousers': 'men tailored formal trousers studio product photography',
    'Merino Knit Polo': 'merino wool knit polo shirt luxury studio',
    'Raw Denim Jeans': 'raw denim selvedge jeans studio product photography',
    'Slim Fit Shirt': 'luxury slim fit formal shirt studio product photography',

    // Shoes
    'Minimal Court Sneakers': 'minimal white luxury sneakers studio product photography',
    'Classic Formal Derby': 'black leather derby shoes studio product photography',
    'Italian Chelsea Boots': 'luxury black leather chelsea boots studio',
    'Aurelia Leather Loafers': 'luxury leather loafers studio product photography',
    'Stiletto Heels': 'luxury black stiletto high heels studio product photography',

    // Accessories
    'Signature Leather Wallet': 'luxury black leather wallet studio product photography',
    'Aurelia Leather Tote': 'luxury leather tote bag studio product photography',
    'Classic Leather Belt': 'black leather belt luxury product photography',
    'Noir Square Sunglasses': 'black square sunglasses luxury product photography',
    'Aurelia Signature Watch': 'luxury minimalist wristwatch studio product photography',
    'Classic Handbag': 'luxury leather handbag purse studio product photography',
    'Womens Sunglasses': 'women designer sunglasses luxury studio product photography',

    // Perfumes
    'Aurelia No. 01 Eau de Parfum': 'luxury perfume bottle product photography',
    'Aurelia No. 02 Eau de Parfum': 'luxury amber perfume bottle studio product photography',
    'Signature Pour Homme': 'luxury mens cologne perfume bottle studio',
    'Oud Intense': 'luxury oud perfume bottle product photography',
    'Bloom Essence': 'floral luxury perfume bottle product photography',
    'Velvet Rose': 'rose luxury perfume bottle product photography',
}

// Verified existing local images that are already high-quality studio shots
const PRESERVED_LOCAL_IMAGES = new Set([
    '/images/minimal-court-sneakers.jpg',
    '/images/classic-formal-derby.jpg',
    '/images/italian-chelsea-boots.jpg',
    '/images/aurelia-leather-loafers.jpg',
    '/images/classic-leather-belt.jpg',
    '/images/noir-square-sunglasses.jpg',
    '/images/aurelia-signature-blazer.jpg',
    '/images/aurelia-wool-overcoat.jpg',
    '/images/silk-evening-dress.jpg',
    '/images/satin-wrap-dress.jpg',
    '/images/tailored-wide-leg-trousers.jpg',
    '/images/cashmere-knit-sweater.jpg',
    '/images/noir-tailored-shirt.jpg',
    '/images/essential-linen-shirt.jpg',
    '/images/classic-tailored-trousers.jpg',
    '/images/merino-knit-polo.jpg',
    '/images/signature-leather-wallet.jpg',
    '/images/aurelia-leather-tote.jpg',
    '/images/aurelia-signature-watch.jpg',
    '/images/aurelia-no-01-eau-de-parfum.jpg',
    '/images/aurelia-no-02-eau-de-parfum.jpg',
])

/**
 * Derives an intelligent search query for any product based on its name, category, and gender.
 *
 * @param {string} name
 * @param {string} category
 * @param {string} gender
 * @returns {string}
 */
export function generateSmartQuery(name = '', category = '', gender = '') {
    const trimmedName = name.trim()
    if (SMART_SEARCH_QUERIES[trimmedName]) {
        return SMART_SEARCH_QUERIES[trimmedName]
    }

    const cleanCategory = category.trim().toLowerCase()
    const cleanGender = gender ? gender.trim().toLowerCase() : ''

    const genderPrefix =
        cleanGender === 'men' ? "men's " : cleanGender === 'women' ? "women's " : ''

    if (cleanCategory.includes('perfume') || cleanCategory.includes('fragrance')) {
        return `luxury perfume bottle studio product photography`
    }
    if (cleanCategory.includes('shoe') || cleanCategory.includes('footwear')) {
        return `luxury ${genderPrefix}shoes studio product photography`
    }
    if (cleanCategory.includes('watch')) {
        return `luxury minimalist wristwatch studio product photography`
    }
    if (cleanCategory.includes('bag')) {
        return `luxury leather bag studio product photography`
    }
    if (cleanCategory.includes('glass')) {
        return `luxury designer sunglasses studio product photography`
    }
    if (cleanCategory.includes('belt')) {
        return `luxury leather belt studio product photography`
    }
    if (cleanCategory.includes('wallet')) {
        return `luxury leather wallet studio product photography`
    }
    if (cleanCategory.includes('clothing') || cleanCategory.includes('apparel')) {
        return `luxury ${genderPrefix}tailored fashion studio product photography`
    }

    return `luxury ${genderPrefix}${trimmedName} studio product photography`
}

/**
 * Fetches a high-resolution, portrait-oriented fashion product image from Pexels API with caching and fallback.
 *
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.category
 * @param {string} params.gender
 * @param {string} params.existingImage
 * @returns {Promise<string>} Resolved image URL or fallback
 */
export async function resolveProductImage({ name = '', category = '', gender = '', existingImage = '' }) {
    const cacheKey = `${name.toLowerCase()}_${category.toLowerCase()}_${gender.toLowerCase()}`

    // 1. Check in-memory server cache
    if (imageCache.has(cacheKey)) {
        return imageCache.get(cacheKey)
    }

    // 2. If existing image is a verified high-quality asset, preserve it
    if (existingImage && PRESERVED_LOCAL_IMAGES.has(existingImage)) {
        imageCache.set(cacheKey, existingImage)
        return existingImage
    }

    const apiKey = process.env.PEXELS_API_KEY?.trim()

    // 3. If Pexels API key is not configured, fallback gracefully
    if (!apiKey) {
        const fallback = existingImage || ''
        if (fallback) {
            imageCache.set(cacheKey, fallback)
        }
        return fallback
    }

    // 4. Query Pexels API dynamically
    try {
        const query = generateSmartQuery(name, category, gender)
        const pexelsUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
            query
        )}&orientation=portrait&per_page=5`

        const response = await fetch(pexelsUrl, {
            headers: {
                Authorization: apiKey,
            },
        })

        if (!response.ok) {
            console.warn(`[Pexels Service] API error (${response.status}) for query "${query}"`)
            const fallback = existingImage || ''
            if (fallback) imageCache.set(cacheKey, fallback)
            return fallback
        }

        const data = await response.json()

        if (data.photos && data.photos.length > 0) {
            // Select best portrait image (large or portrait)
            const photo = data.photos[0]
            const dynamicImageUrl = photo.src?.large || photo.src?.portrait || photo.src?.medium

            if (dynamicImageUrl) {
                imageCache.set(cacheKey, dynamicImageUrl)
                return dynamicImageUrl
            }
        }

        // No photo found for query; fallback
        const fallback = existingImage || ''
        if (fallback) imageCache.set(cacheKey, fallback)
        return fallback
    } catch (error) {
        console.error('[Pexels Service] Network/Fetch error:', error.message)
        const fallback = existingImage || ''
        if (fallback) imageCache.set(cacheKey, fallback)
        return fallback
    }
}

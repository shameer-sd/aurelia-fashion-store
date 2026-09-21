/*
|--------------------------------------------------------------------------
| AURELIA PRODUCT IMAGE RESOLVER & REGISTRY
|--------------------------------------------------------------------------
| Provides consistent image resolution across all frontend product views.
| Priority:
| 1. Dynamic image from server API (product.dynamicImage / product.imageUrl)
| 2. Valid product image URL / local asset
| 3. Canonical name registry mapping
| 4. Fallback placeholder
|--------------------------------------------------------------------------
*/

export const PRODUCT_IMAGE_REGISTRY = {
    // TEST
    'Gender Test Product': '/images/gender-test-product.jpg',

    // SHOES
    'Minimal Court Sneakers': '/images/minimal-court-sneakers.jpg',
    'Classic Formal Derby': '/images/classic-formal-derby.jpg',
    'Italian Chelsea Boots': '/images/italian-chelsea-boots.jpg',
    'Aurelia Leather Loafers': '/images/aurelia-leather-loafers.jpg',
    'Stiletto Heels': '/images/stiletto-heels.jpg',

    // ACCESSORIES
    'Signature Leather Wallet': '/images/signature-leather-wallet.jpg',
    'Aurelia Leather Tote': '/images/aurelia-leather-tote.jpg',
    'Classic Leather Belt': '/images/classic-leather-belt.jpg',
    'Noir Square Sunglasses': '/images/noir-square-sunglasses.jpg',
    'Aurelia Signature Watch': '/images/aurelia-signature-watch.jpg',
    'Classic Handbag': '/images/classic-handbag.jpg',
    'Womens Sunglasses': '/images/womens-sunglasses.jpg',

    // MEN'S CLOTHING
    'Merino Knit Polo': '/images/merino-knit-polo.jpg',
    'Classic Tailored Trousers': '/images/classic-tailored-trousers.jpg',
    'Aurelia Wool Overcoat': '/images/aurelia-wool-overcoat.jpg',
    'Cashmere Knit Sweater': '/images/cashmere-knit-sweater.jpg',
    'Essential Linen Shirt': '/images/essential-linen-shirt.jpg',
    'Noir Tailored Shirt': '/images/noir-tailored-shirt.jpg',
    'Aurelia Signature Blazer': '/images/aurelia-signature-blazer.jpg',
    'Raw Denim Jeans': '/images/raw-denim-jeans.jpg',
    'Slim Fit Shirt': '/images/slim-fit-shirt.jpg',

    // WOMEN'S CLOTHING
    'Tailored Wide-Leg Trousers': '/images/tailored-wide-leg-trousers.jpg',
    'Satin Wrap Dress': '/images/satin-wrap-dress.jpg',
    'Silk Evening Dress': '/images/silk-evening-dress.jpg',
    'Evening Dress': '/images/evening-dress.jpg',
    'Essential Crew Neck Tee': '/images/essential-crew-neck-tee.jpg',

    // FRAGRANCES & PERFUME
    'Aurelia No. 01 Eau de Parfum': '/images/aurelia-no-01-eau-de-parfum.jpg',
    'Aurelia No. 02 Eau de Parfum': '/images/aurelia-no-02-eau-de-parfum.jpg',
    'Signature Pour Homme': '/images/signature-pour-homme.jpg',
    'Oud Intense': '/images/oud-intense.jpg',
    'Bloom Essence': '/images/bloom-essence.jpg',
    'Velvet Rose': '/images/velvet-rose.jpg',
}

// Alias mapping for old or legacy seed paths to canonical public files
export const LEGACY_PATH_MAPPINGS = {
    '/images/blazer.jpg': '/images/aurelia-signature-blazer.jpg',
    '/images/dress.jpg': '/images/silk-evening-dress.jpg',
    '/images/wide-leg-trousers.jpg': '/images/tailored-wide-leg-trousers.jpg',
    '/images/cashmere-sweater.jpg': '/images/cashmere-knit-sweater.jpg',
    '/images/shirt.jpg': '/images/noir-tailored-shirt.jpg',
    '/images/linen-shirt.jpg': '/images/essential-linen-shirt.jpg',
    '/images/wool-overcoat.jpg': '/images/aurelia-wool-overcoat.jpg',
    '/images/tailored-trousers.jpg': '/images/classic-tailored-trousers.jpg',
    '/images/tailored-chinos.jpg': '/images/classic-tailored-trousers.jpg',
    '/images/merino-polo.jpg': '/images/merino-knit-polo.jpg',
    '/images/classic-polo-t-shirt.jpg': '/images/merino-knit-polo.jpg',
    '/images/leather-loafers.jpg': '/images/aurelia-leather-loafers.jpg',
    '/images/court-sneakers.jpg': '/images/minimal-court-sneakers.jpg',
    '/images/chelsea-boots.jpg': '/images/italian-chelsea-boots.jpg',
    '/images/formal-derby.jpg': '/images/classic-formal-derby.jpg',
    '/images/signature-watch.jpg': '/images/aurelia-signature-watch.jpg',
    '/images/minimalist-watch.jpg': '/images/aurelia-signature-watch.jpg',
    '/images/square-sunglasses.jpg': '/images/noir-square-sunglasses.jpg',
    '/images/leather-belt.jpg': '/images/classic-leather-belt.jpg',
    '/images/leather-tote.jpg': '/images/aurelia-leather-tote.jpg',
    '/images/leather-wallet.jpg': '/images/signature-leather-wallet.jpg',
    '/images/perfume-no1.jpg': '/images/aurelia-no-01-eau-de-parfum.jpg',
    '/images/perfume-no2.jpg': '/images/aurelia-no-02-eau-de-parfum.jpg',
}

/**
 * Resolves the optimal, perfectly matching image URL for any product object.
 *
 * @param {Object} product
 * @returns {string}
 */
export function getProductImageUrl(product) {
    if (!product) return ''

    // 1. If dynamic image was attached by backend, use it
    if (product.dynamicImage?.trim()) {
        return product.dynamicImage.trim()
    }
    if (product.imageUrl?.trim()) {
        return product.imageUrl.trim()
    }

    const name = product.name?.trim()
    const image = product.image?.trim()

    // 2. If explicit image is given, check for legacy path translation first
    if (image) {
        if (LEGACY_PATH_MAPPINGS[image]) {
            return LEGACY_PATH_MAPPINGS[image]
        }
        return image
    }

    // 3. Check by product name in registry
    if (name && PRODUCT_IMAGE_REGISTRY[name]) {
        return PRODUCT_IMAGE_REGISTRY[name]
    }

    return ''
}

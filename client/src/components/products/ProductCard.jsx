import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useToast } from '../../context/ToastContext'
import { getProductImageUrl } from '../../utils/productImages'
import QuickViewModal from './QuickViewModal'

function ProductCard({ product }) {
    const { addToCart, getCartQuantity } = useCart()
    const { toggleWishlist, isInWishlist } = useWishlist()
    const { addToast } = useToast()

    const [imageError, setImageError] = useState(false)
    const [added, setAdded] = useState(false)
    const [quickViewOpen, setQuickViewOpen] = useState(false)

    const productId = product._id || product.id
    const imageUrl = getProductImageUrl(product)

    const quantityInCart = getCartQuantity(productId)
    const stock = Number(product.stock ?? 0)
    const isOutOfStock = stock <= 0
    const isMaxQuantity = quantityInCart >= stock
    const isFavorited = isInWishlist(productId)

    const handleAddToCart = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (isOutOfStock || isMaxQuantity) return

        addToCart(product)
        setAdded(true)

        addToast({
            title: 'Added to Bag',
            message: `${product.name} was added to your shopping bag.`,
            type: 'gold',
        })

        setTimeout(() => setAdded(false), 1200)
    }

    const handleWishlistClick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const isNowInWishlist = toggleWishlist(product)

        addToast({
            title: isNowInWishlist
                ? 'Saved to Wishlist'
                : 'Removed from Wishlist',

            message: isNowInWishlist
                ? `${product.name} is now saved to your wishlist.`
                : `${product.name} removed from your wishlist.`,

            type: isNowInWishlist ? 'gold' : 'info',
        })
    }

    const handleQuickViewClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setQuickViewOpen(true)
    }

    return (
        <>
            <article className="group relative flex flex-col justify-between">

                {/* Product Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e8dfd2] shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)]">

                    <Link
                        to={`/shop/${productId}`}
                        className="block h-full w-full"
                    >
                        {!imageError && imageUrl ? (
                            <div className="flex h-full w-full items-center justify-center p-6 sm:p-7 lg:p-8">

                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    onError={() => setImageError(true)}
                                    className="h-full w-full scale-[0.90] object-contain object-center transition-transform duration-500"
                                    loading="lazy"
                                />

                            </div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#e8dfd2] text-[#2c2925]">
                                <span className="font-['Cormorant_Garamond'] text-5xl font-medium tracking-[6px]">
                                    A
                                </span>

                                <span className="mt-3 text-[8px] font-medium uppercase tracking-[3px] text-black/40">
                                    AURELIA
                                </span>

                                <span className="mt-1 text-[7px] uppercase tracking-[2px] text-black/25">
                                    Image Coming Soon
                                </span>
                            </div>
                        )}

                        {/* Subtle dark vignette on hover */}
                        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.08]" />
                    </Link>

                    {/* Top Badges & Buttons */}
                    <div className="absolute inset-x-3.5 top-3.5 z-10 flex items-center justify-between">

                        {/* Out of Stock or Category Badge */}
                        {isOutOfStock ? (
                            <span className="rounded-full border border-black/15 bg-[#111]/85 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[2px] text-white backdrop-blur-md">
                                Sold Out
                            </span>
                        ) : quantityInCart > 0 ? (
                            <span className="rounded-full border border-[#c9ad7a]/30 bg-white/85 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[1.5px] text-[#2c2925] shadow-sm backdrop-blur-md">
                                {quantityInCart} in bag
                            </span>
                        ) : (
                            <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[7px] font-medium uppercase tracking-[1.5px] text-[#2c2925]/80 backdrop-blur-md">
                                {product.gender || 'Collection'}
                            </span>
                        )}

                        {/* Wishlist Heart Button */}
                        <button
                            type="button"
                            onClick={handleWishlistClick}
                            className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 ${isFavorited
                                ? 'scale-105 bg-[#c9ad7a] text-[#111] shadow-md'
                                : 'bg-white/75 text-[#2c2925] shadow-sm hover:scale-110 hover:bg-white hover:text-[#9b7a45]'
                                }`}
                            aria-label="Save to wishlist"
                            title={
                                isFavorited
                                    ? 'Remove from wishlist'
                                    : 'Save to wishlist'
                            }
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4"
                                fill={
                                    isFavorited ? 'currentColor' : 'none'
                                }
                                stroke="currentColor"
                                strokeWidth="1.6"
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                    </div>

                    {/* Quick View Hover Pill (Desktop) */}
                    <div className="absolute inset-x-4 bottom-4 z-10 hidden translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:block">
                        <button
                            type="button"
                            onClick={handleQuickViewClick}
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white/90 text-[9px] font-semibold uppercase tracking-[2px] text-[#111] shadow-lg backdrop-blur-md transition-all hover:bg-black hover:text-white"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-3.5 w-3.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="3" />
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            </svg>

                            Quick View
                        </button>
                    </div>
                </div>

                {/* Product Information */}
                <div className="pb-2 pt-4">

                    <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0 flex-1">

                            <p className="text-[8px] font-medium uppercase tracking-[2.5px] text-[#9b7a45]">
                                {product.category}
                            </p>

                            <Link
                                to={`/shop/${productId}`}
                                className="mt-1 block truncate font-['Cormorant_Garamond'] text-[23px] font-medium leading-tight text-[#2c2925] transition-colors duration-300 hover:text-[#9b7a45]"
                            >
                                {product.name}
                            </Link>

                        </div>

                        <p className="shrink-0 font-['Cormorant_Garamond'] text-[21px] font-medium text-[#2c2925]">
                            ₹{product.price}
                        </p>

                    </div>

                    {/* Stock Status & Micro-Info */}
                    <div className="mt-2 flex items-center justify-between text-[8px] uppercase tracking-[1.5px] text-black/40">

                        <span>
                            {isOutOfStock
                                ? 'Sold Out'
                                : `${stock} in stock`}
                        </span>

                        <button
                            type="button"
                            onClick={handleQuickViewClick}
                            className="text-[#9b7a45] hover:underline sm:hidden"
                        >
                            Quick Preview
                        </button>

                    </div>

                    {/* Direct Add to Cart Button */}
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={isOutOfStock || isMaxQuantity}
                        className="mt-4 flex min-h-[46px] w-full items-center justify-center rounded-full border border-black/15 bg-white/45 px-4 text-[8px] font-semibold uppercase tracking-[2px] text-[#2c2925] backdrop-blur-md transition-all duration-300 hover:border-[#111] hover:bg-[#111] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {isOutOfStock
                            ? 'Sold Out'
                            : isMaxQuantity
                                ? 'Maximum In Bag'
                                : added
                                    ? 'Added to Bag ✓'
                                    : 'Add to Bag'}
                    </button>
                </div>
            </article>

            {/* Quick View Modal */}
            <QuickViewModal
                product={product}
                isOpen={quickViewOpen}
                onClose={() => setQuickViewOpen(false)}
            />
        </>
    )
}

export default ProductCard
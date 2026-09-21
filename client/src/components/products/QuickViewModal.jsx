import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useToast } from '../../context/ToastContext'
import { getProductImageUrl } from '../../utils/productImages'

export default function QuickViewModal({ product, isOpen, onClose }) {
    const { addToCart, getCartQuantity } = useCart()
    const { toggleWishlist, isInWishlist } = useWishlist()
    const { addToast } = useToast()

    const [selectedSize, setSelectedSize] = useState('M')
    const [added, setAdded] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen || !product) return null

    const productId = product._id || product.id
    const imgUrl = getProductImageUrl(product)
    const stock = Number(product.stock ?? 0)
    const isOutOfStock = stock <= 0
    const inCartQty = getCartQuantity(productId)
    const isMaxQty = inCartQty >= stock
    const isFavorited = isInWishlist(productId)

    const sizes = ['XS', 'S', 'M', 'L', 'XL']

    const handleAddToCart = () => {
        if (isOutOfStock || isMaxQty) return
        addToCart(product)
        setAdded(true)
        addToast({
            title: 'Added to Bag',
            message: `${product.name} (Size ${selectedSize}) was added to your bag.`,
            type: 'gold',
        })
        setTimeout(() => setAdded(false), 1500)
    }

    const handleWishlistToggle = () => {
        const isNowInWishlist = toggleWishlist(product)
        addToast({
            title: isNowInWishlist ? 'Saved to Wishlist' : 'Removed from Wishlist',
            message: isNowInWishlist
                ? `${product.name} is now saved to your wishlist.`
                : `${product.name} removed from your wishlist.`,
            type: isNowInWishlist ? 'gold' : 'info',
        })
    }

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Box */}
            <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-[#c9ad7a]/30 bg-[#121110]/95 text-[#f8f4ec] shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300">
                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 rounded-full bg-black/40 p-2.5 text-white/70 hover:bg-black/80 hover:text-white transition-colors backdrop-blur-md"
                    aria-label="Close modal"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Image Column */}
                    <div className="relative aspect-[4/5] md:aspect-auto md:h-full min-h-[350px] bg-[#1a1815] overflow-hidden">
                        {imgUrl ? (
                            <img
                                src={imgUrl}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center font-['Cormorant_Garamond'] text-6xl text-white/30">
                                AURELIA
                            </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute left-5 top-5">
                            <span className="rounded-full border border-white/20 bg-black/40 px-3.5 py-1 text-[8px] uppercase tracking-[2px] text-white/90 backdrop-blur-md">
                                {product.category}
                            </span>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10">
                        <div>
                            {/* Eyebrow & Wishlist button */}
                            <div className="flex items-center justify-between">
                                <p className="text-[9px] uppercase tracking-[3px] text-[#c9ad7a]">
                                    Aurelia Edition · {product.gender || 'Unisex'}
                                </p>

                                <button
                                    type="button"
                                    onClick={handleWishlistToggle}
                                    className={`rounded-full p-2 transition-all ${
                                        isFavorited
                                            ? 'bg-[#c9ad7a]/20 text-[#c9ad7a]'
                                            : 'bg-white/5 text-white/60 hover:text-white'
                                    }`}
                                    aria-label="Save to wishlist"
                                >
                                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Title */}
                            <h3 className="mt-3 font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-medium leading-tight text-white">
                                {product.name}
                            </h3>

                            {/* Price */}
                            <div className="mt-3 flex items-baseline gap-3">
                                <span className="font-['Cormorant_Garamond'] text-3xl font-medium text-[#dfc89f]">
                                    ₹{product.price}
                                </span>
                                <span className="text-[10px] uppercase tracking-[1.5px] text-white/40">
                                    Complimentary Express Shipping
                                </span>
                            </div>

                            {/* Description */}
                            <p className="mt-4 text-xs font-light leading-relaxed text-white/65 line-clamp-3">
                                {product.description ||
                                    'Sculpted with meticulous craftsmanship, featuring tailored finishing and refined silhouette engineered for timeless elegance.'}
                            </p>

                            {/* Size Selector */}
                            <div className="mt-6">
                                <div className="flex items-center justify-between text-[9px] uppercase tracking-[2px] text-white/60 mb-2">
                                    <span>Select Size</span>
                                    <span className="text-[#c9ad7a] cursor-pointer hover:underline">Size Guide</span>
                                </div>
                                <div className="flex gap-2">
                                    {sizes.map((sz) => (
                                        <button
                                            key={sz}
                                            type="button"
                                            onClick={() => setSelectedSize(sz)}
                                            className={`h-9 w-11 rounded-lg text-xs font-medium uppercase tracking-[1px] transition-all ${
                                                selectedSize === sz
                                                    ? 'border border-[#c9ad7a] bg-[#c9ad7a]/20 text-[#c9ad7a]'
                                                    : 'border border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:bg-white/10'
                                            }`}
                                        >
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Stock Indicator */}
                            <div className="mt-5 flex items-center gap-2 text-[9px] uppercase tracking-[1.5px] text-white/50">
                                <span className={`h-1.5 w-1.5 rounded-full ${isOutOfStock ? 'bg-red-400' : 'bg-[#c9ad7a]'}`} />
                                <span>{isOutOfStock ? 'Currently Sold Out' : `${stock} items available in stock`}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 space-y-3">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={isOutOfStock || isMaxQty}
                                className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#c9ad7a] px-6 text-[10px] font-semibold uppercase tracking-[2.5px] text-[#111] transition-all duration-300 hover:bg-[#dfc89f] hover:shadow-[0_10px_25px_rgba(201,173,122,0.3)] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                {isOutOfStock
                                    ? 'Sold Out'
                                    : isMaxQty
                                        ? 'Maximum In Bag'
                                        : added
                                            ? 'Added to Bag ✓'
                                            : 'Add to Shopping Bag'}
                            </button>

                            <Link
                                to={`/shop/${productId}`}
                                onClick={onClose}
                                className="flex min-h-[46px] w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-[9px] uppercase tracking-[2px] text-white/80 transition-all hover:bg-white/10 hover:text-white"
                            >
                                View Complete Details →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

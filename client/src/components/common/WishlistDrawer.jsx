import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'
import { getProductImageUrl } from '../../utils/productImages'

export default function WishlistDrawer() {
    const { wishlistItems, removeFromWishlist, isWishlistOpen, setIsWishlistOpen, clearWishlist } = useWishlist()
    const { addToCart } = useCart()
    const { addToast } = useToast()

    useEffect(() => {
        if (isWishlistOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isWishlistOpen])

    if (!isWishlistOpen) return null

    const handleMoveToCart = (product) => {
        addToCart(product)
        const id = product._id || product.id
        removeFromWishlist(id)
        addToast({
            title: 'Added to Bag',
            message: `${product.name} moved to your shopping bag.`,
            type: 'gold',
        })
    }

    return (
        <div className="fixed inset-0 z-[110] flex justify-end">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
                onClick={() => setIsWishlistOpen(false)}
            />

            {/* Slide-over panel */}
            <div className="relative flex h-full w-full max-w-md flex-col border-l border-[#c9ad7a]/20 bg-[#121110] text-[#f8f4ec] shadow-[0_0_80px_rgba(0,0,0,0.9)] z-10 transition-transform duration-500">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
                    <div>
                        <p className="text-[9px] uppercase tracking-[3px] text-[#c9ad7a]">
                            Your Curated Selection
                        </p>
                        <h2 className="mt-1 font-['Cormorant_Garamond'] text-3xl font-medium text-white">
                            Saved Pieces ({wishlistItems.length})
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsWishlistOpen(false)}
                        className="rounded-full bg-white/5 p-2 text-white/60 hover:bg-white/15 hover:text-white transition-colors"
                        aria-label="Close wishlist"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                    {wishlistItems.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center py-16">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#c9ad7a]/30 bg-[#c9ad7a]/10 text-[#c9ad7a] mb-4">
                                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>
                            <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-white">
                                Wishlist is Empty
                            </h3>
                            <p className="mt-2 text-xs leading-relaxed text-white/50 max-w-xs font-light">
                                Explore our bespoke collections and tap the heart icon on any piece to save it for later.
                            </p>
                            <Link
                                to="/shop"
                                onClick={() => setIsWishlistOpen(false)}
                                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#c9ad7a] bg-[#c9ad7a]/10 px-6 py-3 text-[10px] uppercase tracking-[2px] text-[#c9ad7a] hover:bg-[#c9ad7a] hover:text-[#111] transition-all duration-300"
                            >
                                Explore Collections →
                            </Link>
                        </div>
                    ) : (
                        wishlistItems.map((item) => {
                            const id = item._id || item.id
                            const img = getProductImageUrl(item)
                            const isOutOfStock = Number(item.stock ?? 0) <= 0

                            return (
                                <article
                                    key={id}
                                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-[#c9ad7a]/40 hover:bg-white/[0.06]"
                                >
                                    <Link
                                        to={`/shop/${id}`}
                                        onClick={() => setIsWishlistOpen(false)}
                                        className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#1f1d1a]"
                                    >
                                        {img ? (
                                            <img
                                                src={img}
                                                alt={item.name}
                                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center font-['Cormorant_Garamond'] text-2xl text-white/30">
                                                A
                                            </div>
                                        )}
                                    </Link>

                                    <div className="flex flex-1 flex-col justify-between min-w-0">
                                        <div>
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-[8px] uppercase tracking-[2px] text-[#c9ad7a]">
                                                    {item.category}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromWishlist(id)}
                                                    className="text-white/40 hover:text-red-400 transition-colors"
                                                    title="Remove from wishlist"
                                                >
                                                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <line x1="18" y1="6" x2="6" y2="18" />
                                                        <line x1="6" y1="6" x2="18" y2="18" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <Link
                                                to={`/shop/${id}`}
                                                onClick={() => setIsWishlistOpen(false)}
                                                className="mt-0.5 block truncate font-['Cormorant_Garamond'] text-lg font-medium text-white hover:text-[#c9ad7a] transition-colors"
                                            >
                                                {item.name}
                                            </Link>

                                            <p className="mt-1 text-xs font-light text-white/80">
                                                ₹{item.price}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleMoveToCart(item)}
                                            disabled={isOutOfStock}
                                            className="mt-3 flex w-full items-center justify-center rounded-full border border-[#c9ad7a]/50 bg-[#c9ad7a]/15 py-2 text-[9px] uppercase tracking-[2px] text-[#c9ad7a] transition-all hover:bg-[#c9ad7a] hover:text-[#111] disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            {isOutOfStock ? 'Sold Out' : 'Move to Bag →'}
                                        </button>
                                    </div>
                                </article>
                            )
                        })
                    )}
                </div>

                {/* Footer actions */}
                {wishlistItems.length > 0 && (
                    <div className="border-t border-white/10 p-6">
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={clearWishlist}
                                className="w-1/3 rounded-full border border-white/15 bg-white/5 py-3 text-[9px] uppercase tracking-[2px] text-white/60 hover:bg-white/10 hover:text-white transition-all"
                            >
                                Clear All
                            </button>
                            <Link
                                to="/shop"
                                onClick={() => setIsWishlistOpen(false)}
                                className="w-2/3 flex items-center justify-center rounded-full bg-[#c9ad7a] py-3 text-[9px] font-semibold uppercase tracking-[2px] text-[#111] hover:bg-[#dfc89f] transition-all shadow-[0_4px_20px_rgba(201,173,122,0.25)]"
                            >
                                Continue Browsing
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

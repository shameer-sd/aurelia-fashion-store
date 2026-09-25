import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getProductImageUrl } from '../../utils/productImages'

export default function SearchModal({ isOpen, onClose }) {
    const [query, setQuery] = useState('')
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const inputRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
            // Fetch products if not yet loaded
            if (products.length === 0) {
                setLoading(true)
                fetch(' /api/v1/products')
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.products) setProducts(data.products)
                    })
                    .catch((err) => console.error(err))
                    .finally(() => setLoading(false))
            }
        }
    }, [isOpen, products.length])

    // Listen for Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
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

    if (!isOpen) return null

    const filtered = query.trim() === ''
        ? []
        : products.filter((p) => {
            const q = query.toLowerCase()
            return (
                p.name?.toLowerCase().includes(q) ||
                p.category?.toLowerCase().includes(q) ||
                p.gender?.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q)
            )
        }).slice(0, 6)

    const popularCategories = ['Women', 'Men', 'Shoes', 'Accessories', 'Perfume']

    const handleSelectCategory = (cat) => {
        onClose()
        if (cat === 'Women' || cat === 'Men') {
            navigate(`/shop?gender=${cat}`)
        } else {
            navigate(`/shop?category=${cat}`)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Box */}
            <div className="relative w-full max-w-2xl rounded-3xl border border-[#c9ad7a]/30 bg-[#121110]/95 p-6 sm:p-8 text-[#f8f4ec] shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-3xl transition-all duration-300">
                {/* Search Bar Input */}
                <div className="relative flex items-center border-b border-white/10 pb-4">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#c9ad7a] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
                    </svg>

                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search collection, dresses, footwear, scents..."
                        className="w-full bg-transparent px-4 text-base sm:text-lg font-light text-white outline-none placeholder:text-white/30"
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            className="mr-3 text-xs uppercase tracking-[1.5px] text-white/40 hover:text-white"
                        >
                            Clear
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full bg-white/10 p-2 text-white/60 hover:bg-white/20 hover:text-white transition-colors"
                        aria-label="Close search"
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Categories Shortcut */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="text-[9px] uppercase tracking-[2px] text-[#c9ad7a] mr-2">
                        Quick Explore:
                    </span>
                    {popularCategories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => handleSelectCategory(cat)}
                            className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] uppercase tracking-[1.5px] text-white/70 hover:border-[#c9ad7a]/50 hover:bg-[#c9ad7a]/15 hover:text-[#c9ad7a] transition-all"
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Results Area */}
                <div className="mt-6 max-h-[60vh] overflow-y-auto pr-1">
                    {loading && (
                        <p className="py-8 text-center text-xs uppercase tracking-[2px] text-white/40">
                            Loading catalog...
                        </p>
                    )}

                    {!loading && query.trim() !== '' && filtered.length === 0 && (
                        <div className="py-12 text-center">
                            <p className="font-['Cormorant_Garamond'] text-2xl text-white/80">
                                No pieces found
                            </p>
                            <p className="mt-2 text-[10px] uppercase tracking-[1.5px] text-white/40">
                                Try searching for another silhouette, material, or category.
                            </p>
                        </div>
                    )}

                    {filtered.length > 0 && (
                        <div className="grid gap-3 sm:grid-cols-2">
                            {filtered.map((product) => {
                                const id = product._id || product.id
                                const imgUrl = getProductImageUrl(product)
                                return (
                                    <Link
                                        key={id}
                                        to={`/shop/${id}`}
                                        onClick={onClose}
                                        className="group flex items-center gap-3.5 rounded-2xl border border-white/5 bg-white/[0.03] p-3 hover:border-[#c9ad7a]/40 hover:bg-white/[0.08] transition-all"
                                    >
                                        <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-[#222]">
                                            {imgUrl ? (
                                                <img
                                                    src={imgUrl}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center font-['Cormorant_Garamond'] text-lg text-white/40">
                                                    A
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-[8px] font-medium uppercase tracking-[2px] text-[#c9ad7a]">
                                                {product.category}
                                            </p>
                                            <h4 className="truncate font-['Cormorant_Garamond'] text-base font-medium text-white group-hover:text-[#c9ad7a] transition-colors">
                                                {product.name}
                                            </h4>
                                            <p className="mt-0.5 text-xs font-light text-white/70">
                                                ₹{product.price}
                                            </p>
                                        </div>

                                        <span className="text-white/40 group-hover:text-[#c9ad7a] group-hover:translate-x-1 transition-all text-sm pr-2">
                                            →
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Footer hint */}
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[9px] uppercase tracking-[1.5px] text-white/35">
                    <span>Press <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-white/80">ESC</kbd> to exit</span>
                    <Link
                        to="/shop"
                        onClick={onClose}
                        className="text-[#c9ad7a] hover:underline"
                    >
                        View Full Catalog →
                    </Link>
                </div>
            </div>
        </div>
    )
}

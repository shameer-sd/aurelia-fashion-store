import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { getProductImageUrl } from '../utils/productImages'
import ProductCard from '../components/products/ProductCard'
import API_URL from '../utils/api'

function ProductDetails() {
    const { id } = useParams()
    const { addToCart, getCartQuantity } = useCart()
    const { toggleWishlist, isInWishlist } = useWishlist()
    const { addToast } = useToast()

    const [product, setProduct] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [added, setAdded] = useState(false)
    const [selectedSize, setSelectedSize] = useState('M')
    const [activeAccordion, setActiveAccordion] = useState('materials')
    const [isZoomed, setIsZoomed] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

    useEffect(() => {
        const fetchProductAndRelated = async () => {
            setLoading(true)
            setError('')

            try {
                const response = await fetch(
                    `${API_URL}/api/v1/products/${productId}`
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Product not found')
                }

                setProduct(data.product)

                // Fetch catalog for related pieces
                const allRes = await fetch(
                    `${API_URL}/api/v1/products`
                )

                const allData = await allRes.json()

                if (allData.products) {
                    const related = allData.products
                        .filter(
                            (p) =>
                                (p._id || p.id) !== id &&
                                p.category === data.product.category
                        )
                        .slice(0, 4)

                    setRelatedProducts(
                        related.length > 0
                            ? related
                            : allData.products
                                .filter((p) => (p._id || p.id) !== id)
                                .slice(0, 4)
                    )
                }
            } catch (err) {
                setError(err.message || 'Unable to load product')
            } finally {
                setLoading(false)
            }
        }

        fetchProductAndRelated()

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, [id])

    const handleMouseMove = (e) => {
        const { left, top, width, height } =
            e.currentTarget.getBoundingClientRect()

        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100

        setMousePos({ x, y })
    }

    const handleAddToCart = () => {
        if (!product || product.stock <= 0) return

        const currentQty = getCartQuantity(product._id || product.id)

        if (currentQty >= product.stock) return

        addToCart(product)

        setAdded(true)

        addToast({
            title: 'Added to Bag',
            message: `${product.name} (Size ${selectedSize}) has been added to your shopping bag.`,
            type: 'gold',
        })

        setTimeout(() => setAdded(false), 2000)
    }

    const handleWishlistToggle = () => {
        if (!product) return

        const isNowInWishlist = toggleWishlist(product)

        addToast({
            title: isNowInWishlist
                ? 'Saved to Wishlist'
                : 'Removed from Wishlist',

            message: isNowInWishlist
                ? `${product.name} is saved to your wishlist.`
                : `${product.name} removed from your wishlist.`,

            type: isNowInWishlist ? 'gold' : 'info',
        })
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f3eadc] px-6 pb-20 pt-32 text-[#2c2925] md:px-12">
                <div className="mx-auto max-w-[1500px]">
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div className="aspect-[4/5] rounded-3xl bg-black/5 skeleton-shimmer" />

                        <div className="space-y-6 pt-10">
                            <div className="h-6 w-32 rounded-full bg-black/5 skeleton-shimmer" />
                            <div className="h-16 w-3/4 rounded-2xl bg-black/5 skeleton-shimmer" />
                            <div className="h-10 w-40 rounded-xl bg-black/5 skeleton-shimmer" />
                            <div className="h-28 w-full rounded-2xl bg-black/5 skeleton-shimmer" />
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    if (error || !product) {
        return (
            <main className="min-h-screen bg-[#f3eadc] px-6 pb-20 pt-32 text-[#2c2925] flex items-center justify-center md:px-12">
                <div className="mx-auto max-w-lg text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[4px] text-[#9b7a45]">
                        AURELIA / COLLECTION
                    </p>

                    <h1 className="mt-4 font-['Cormorant_Garamond'] text-5xl font-medium md:text-6xl">
                        Piece Not Found
                    </h1>

                    <p className="mt-4 text-xs text-black/50 font-light">
                        {error ||
                            'This silhouette is currently unavailable or has been archived from the active lookbook.'}
                    </p>

                    <Link
                        to="/shop"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-xs font-semibold uppercase tracking-[2px] text-white hover:bg-[#9b7a45] transition-all"
                    >
                        Return to Lookbook →
                    </Link>
                </div>
            </main>
        )
    }

    const productId = product._id || product.id
    const imageUrl = getProductImageUrl(product)
    const cartQuantity = getCartQuantity(productId)
    const stock = Number(product.stock ?? 0)
    const isOutOfStock = stock <= 0
    const stockLimitReached = cartQuantity >= stock
    const isFavorited = isInWishlist(productId)

    const sizes = ['XS', 'S', 'M', 'L', 'XL']

    return (
        <main className="min-h-screen bg-[#f3eadc] text-[#2c2925]">
            {/* Breadcrumb Bar */}
            <section className="px-6 pt-28 pb-6 sm:px-10 lg:px-14">
                <div className="mx-auto flex max-w-[1600px] items-center gap-3 text-[10px] font-medium uppercase tracking-[2px] text-black/45">
                    <Link
                        to="/"
                        className="hover:text-black transition-colors"
                    >
                        Home
                    </Link>

                    <span>/</span>

                    <Link
                        to="/shop"
                        className="hover:text-black transition-colors"
                    >
                        Collection
                    </Link>

                    <span>/</span>

                    {product.gender && (
                        <>
                            <Link
                                to={`/shop?gender=${product.gender}`}
                                className="hover:text-black transition-colors"
                            >
                                {product.gender}
                            </Link>

                            <span>/</span>
                        </>
                    )}

                    <span className="text-[#9b7a45] truncate max-w-[200px]">
                        {product.name}
                    </span>
                </div>
            </section>

            {/* Product View Section */}
            <section className="px-6 pb-24 sm:px-10 lg:px-14">
                <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                    {/* Left: Image Gallery & Zoom */}
                    <div className="relative">
                        <div
                            className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[#e7ddcf] shadow-[0_20px_50px_rgba(0,0,0,0.06)] cursor-crosshair"
                            onMouseEnter={() => setIsZoomed(true)}
                            onMouseLeave={() => setIsZoomed(false)}
                            onMouseMove={handleMouseMove}
                        >
                            {imageUrl ? (
                                <div className="flex h-full w-full items-center justify-center p-6 sm:p-8 lg:p-10">
                                    <img
                                        src={imageUrl}
                                        alt={product.name}
                                        style={
                                            isZoomed
                                                ? {
                                                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                                                    transform: 'scale(1.35)',
                                                }
                                                : {
                                                    transform: 'scale(1)',
                                                }
                                        }
                                        className="h-full w-full object-contain object-center transition-transform duration-300 ease-out"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-full w-full flex-col items-center justify-center font-['Cormorant_Garamond'] text-6xl text-[#2c2925]/30">
                                    <span>AURELIA</span>
                                </div>
                            )}

                            {/* Vignette Overlay */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                            {/* Category Tag */}
                            <div className="absolute left-6 top-6">
                                <span className="rounded-full border border-white/30 bg-black/30 px-4 py-1.5 text-[8px] font-semibold uppercase tracking-[2px] text-white backdrop-blur-md">
                                    {product.category}
                                </span>
                            </div>

                            {/* Out of stock banner */}
                            {isOutOfStock && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
                                    <span className="rounded-full border border-white/40 bg-black/70 px-8 py-3.5 text-[10px] font-semibold uppercase tracking-[3px] text-white backdrop-blur-md">
                                        OUT OF STOCK
                                    </span>
                                </div>
                            )}
                        </div>

                        <p className="mt-3 text-center text-[9px] uppercase tracking-[2px] text-black/35">
                            Hover over image to inspect fabric & weave texture
                        </p>
                    </div>

                    {/* Right: Product Details & Purchase Form */}
                    <div className="flex flex-col justify-between">
                        <div>
                            {/* Eyebrow & Wishlist button */}
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-semibold uppercase tracking-[3.5px] text-[#9b7a45]">
                                    AURELIA ATELIER ·{' '}
                                    {product.gender || 'UNISEX'}
                                </span>

                                <button
                                    type="button"
                                    onClick={handleWishlistToggle}
                                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[9px] font-medium uppercase tracking-[1.5px] transition-all ${isFavorited
                                        ? 'border-[#9b7a45] bg-[#9b7a45]/15 text-[#9b7a45]'
                                        : 'border-black/15 bg-white/40 text-black/70 hover:border-black/30 hover:bg-white/80'
                                        }`}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4"
                                        fill={
                                            isFavorited
                                                ? 'currentColor'
                                                : 'none'
                                        }
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    >
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>

                                    <span>
                                        {isFavorited
                                            ? 'Saved in Wishlist'
                                            : 'Save to Wishlist'}
                                    </span>
                                </button>
                            </div>

                            {/* Name */}
                            <h1 className="mt-4 font-['Cormorant_Garamond'] text-4xl sm:text-5xl lg:text-6xl font-medium leading-[0.95] text-[#111]">
                                {product.name}
                            </h1>

                            {/* Price & Free Courier */}
                            <div className="mt-5 flex items-baseline gap-4">
                                <span className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-medium text-[#111]">
                                    ₹{product.price}
                                </span>

                                <span className="rounded-full bg-[#9b7a45]/15 px-3 py-1 text-[9px] font-medium uppercase tracking-[1.5px] text-[#8a693a]">
                                    Complimentary Express Transit
                                </span>
                            </div>

                            {/* Description */}
                            <p className="mt-6 text-xs sm:text-sm font-light leading-relaxed text-black/70 max-w-xl">
                                {product.description ||
                                    'Sculpted with meticulous craftsmanship, featuring tailored finishing and refined silhouette engineered for effortless everyday luxury.'}
                            </p>

                            {/* Size Selection */}
                            <div className="mt-8 border-t border-black/10 pt-6">
                                <div className="flex items-center justify-between text-[10px] uppercase tracking-[2px] text-black/60 mb-3">
                                    <span>
                                        Select Size:{' '}
                                        <strong className="text-black font-semibold">
                                            {selectedSize}
                                        </strong>
                                    </span>

                                    <span className="text-[#9b7a45] cursor-pointer hover:underline">
                                        Size & Fit Guide
                                    </span>
                                </div>

                                <div className="flex gap-2.5">
                                    {sizes.map((sz) => (
                                        <button
                                            key={sz}
                                            type="button"
                                            onClick={() => setSelectedSize(sz)}
                                            className={`h-11 w-14 rounded-xl text-xs font-medium uppercase tracking-[1.5px] transition-all ${selectedSize === sz
                                                ? 'border-2 border-black bg-black text-white shadow-md'
                                                : 'border border-black/15 bg-white/40 text-black/80 hover:border-black/30 hover:bg-white/70'
                                                }`}
                                        >
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Stock Status Badge */}
                            <div className="mt-6 flex items-center justify-between rounded-2xl border border-black/10 bg-white/40 px-5 py-4 backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${isOutOfStock
                                            ? 'bg-red-500'
                                            : 'bg-[#9b7a45]'
                                            }`}
                                    />

                                    <div>
                                        <p className="text-[9px] font-semibold uppercase tracking-[2px] text-black/50">
                                            Availability Status
                                        </p>

                                        <p className="text-xs font-medium text-black">
                                            {isOutOfStock
                                                ? 'Currently Sold Out'
                                                : `${stock} pieces ready for dispatch`}
                                        </p>
                                    </div>
                                </div>

                                {cartQuantity > 0 && (
                                    <span className="text-[10px] uppercase tracking-[1px] text-[#9b7a45] font-semibold">
                                        {cartQuantity} in your bag
                                    </span>
                                )}
                            </div>

                            {/* Add to Cart CTA */}
                            <div className="mt-8 space-y-3">
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    disabled={
                                        isOutOfStock || stockLimitReached
                                    }
                                    className="flex min-h-[60px] w-full items-center justify-center rounded-full bg-black px-8 text-xs font-semibold uppercase tracking-[3px] text-white transition-all duration-300 hover:bg-[#9b7a45] hover:shadow-[0_16px_36px_rgba(0,0,0,0.25)] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {isOutOfStock
                                        ? 'Sold Out'
                                        : stockLimitReached
                                            ? 'Maximum Available in Bag'
                                            : added
                                                ? 'Added to Bag ✓'
                                                : 'Add to Shopping Bag →'}
                                </button>
                            </div>

                            {/* Collapsible Accordions */}
                            <div className="mt-10 border-t border-black/10 divide-y divide-black/10 text-xs">
                                {/* Accordion 1 */}
                                <div className="py-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveAccordion(
                                                activeAccordion === 'materials'
                                                    ? ''
                                                    : 'materials'
                                            )
                                        }
                                        className="flex w-full items-center justify-between text-left text-[11px] font-semibold uppercase tracking-[2px] text-black"
                                    >
                                        <span>
                                            Craftsmanship & Noble Materials
                                        </span>

                                        <span>
                                            {activeAccordion === 'materials'
                                                ? '−'
                                                : '+'}
                                        </span>
                                    </button>

                                    {activeAccordion === 'materials' && (
                                        <p className="mt-3 text-xs leading-relaxed text-black/60 font-light">
                                            Constructed exclusively using
                                            ethically sourced Italian fabrics,
                                            natural dyes, and reinforced French
                                            seams. Dry clean only.
                                        </p>
                                    )}
                                </div>

                                {/* Accordion 2 */}
                                <div className="py-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveAccordion(
                                                activeAccordion === 'fit'
                                                    ? ''
                                                    : 'fit'
                                            )
                                        }
                                        className="flex w-full items-center justify-between text-left text-[11px] font-semibold uppercase tracking-[2px] text-black"
                                    >
                                        <span>
                                            Silhouette & Tailored Fit
                                        </span>

                                        <span>
                                            {activeAccordion === 'fit'
                                                ? '−'
                                                : '+'}
                                        </span>
                                    </button>

                                    {activeAccordion === 'fit' && (
                                        <p className="mt-3 text-xs leading-relaxed text-black/60 font-light">
                                            Fits true to size. Designed for an
                                            elegant tailored drape with gentle
                                            contouring at the shoulders.
                                        </p>
                                    )}
                                </div>

                                {/* Accordion 3 */}
                                <div className="py-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveAccordion(
                                                activeAccordion === 'shipping'
                                                    ? ''
                                                    : 'shipping'
                                            )
                                        }
                                        className="flex w-full items-center justify-between text-left text-[11px] font-semibold uppercase tracking-[2px] text-black"
                                    >
                                        <span>
                                            White-Glove Courier & Returns
                                        </span>

                                        <span>
                                            {activeAccordion === 'shipping'
                                                ? '−'
                                                : '+'}
                                        </span>
                                    </button>

                                    {activeAccordion === 'shipping' && (
                                        <p className="mt-3 text-xs leading-relaxed text-black/60 font-light">
                                            Complimentary express transit
                                            delivered within 2-4 business days.
                                            14-day hassle-free atelier returns
                                            and size exchanges.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Recommendations Carousel */}
            {relatedProducts.length > 0 && (
                <section className="border-t border-black/10 bg-[#ebe4d6] px-6 py-20 sm:px-10 lg:px-14">
                    <div className="mx-auto max-w-[1600px]">
                        <div className="mb-10 flex items-end justify-between border-b border-black/10 pb-4">
                            <div>
                                <p className="text-[9px] font-semibold uppercase tracking-[3px] text-[#9b7a45]">
                                    Complete The Look
                                </p>

                                <h3 className="mt-1 font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-medium">
                                    Complementary Pieces
                                </h3>
                            </div>

                            <Link
                                to="/shop"
                                className="text-xs uppercase tracking-[2px] text-black hover:text-[#9b7a45] transition-colors"
                            >
                                View Full Capsule →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((p) => (
                                <ProductCard
                                    key={p._id || p.id}
                                    product={p}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}

export default ProductDetails
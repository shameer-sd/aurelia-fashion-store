import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'

function Shop() {
    const [searchParams, setSearchParams] = useSearchParams()

    const genderFromUrl = searchParams.get('gender')
    const categoryFromUrl = searchParams.get('category')

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedGender, setSelectedGender] = useState('All')
    const [sortBy, setSortBy] = useState('featured')
    const [gridCols, setGridCols] = useState(4) // 4 or 2

    /* ================= FETCH PRODUCTS ================= */
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/products')
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch products')
                }

                setProducts(data.products)
            } catch (err) {
                setError(err.message || 'Unable to load products')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    /* ================= SYNC URL WITH FILTERS ================= */
    useEffect(() => {
        setSelectedGender(genderFromUrl || 'All')
        setSelectedCategory(categoryFromUrl || 'All')
    }, [genderFromUrl, categoryFromUrl])

    const updateUrlFilter = (gender, category) => {
        const params = new URLSearchParams()
        if (gender && gender !== 'All') params.set('gender', gender)
        if (category && category !== 'All') params.set('category', category)
        setSearchParams(params)
    }

    const handleGenderChange = (gender) => {
        setSelectedGender(gender)
        updateUrlFilter(gender, selectedCategory)
    }

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat)
        updateUrlFilter(selectedGender, cat)
    }

    const handleClearAll = () => {
        setSearchTerm('')
        setSelectedCategory('All')
        setSelectedGender('All')
        setSortBy('featured')
        setSearchParams({})
    }

    /* ================= CATEGORIES & GENDERS ================= */
    const categories = useMemo(() => {
        const unique = [
            ...new Set(products.map((p) => p.category).filter(Boolean)),
        ]
        return ['All', ...unique]
    }, [products])

    const genders = useMemo(() => {
        const unique = [
            ...new Set(products.map((p) => p.gender).filter(Boolean)),
        ]
        return ['All', ...unique]
    }, [products])

    /* ================= FILTER & SORT PRODUCTS ================= */
    const filteredProducts = useMemo(() => {
        const search = searchTerm.trim().toLowerCase()

        let list = products.filter((product) => {
            const matchesSearch =
                !search ||
                product.name?.toLowerCase().includes(search) ||
                product.category?.toLowerCase().includes(search) ||
                product.description?.toLowerCase().includes(search)

            const matchesCategory =
                selectedCategory === 'All' || product.category === selectedCategory

            const matchesGender =
                selectedGender === 'All' || product.gender === selectedGender

            return matchesSearch && matchesCategory && matchesGender
        })

        if (sortBy === 'price-low') {
            list = [...list].sort((a, b) => Number(a.price) - Number(b.price))
        } else if (sortBy === 'price-high') {
            list = [...list].sort((a, b) => Number(b.price) - Number(a.price))
        } else if (sortBy === 'name') {
            list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        }

        return list
    }, [products, searchTerm, selectedCategory, selectedGender, sortBy])

    /* ================= HERO CONTENT ================= */
    const isWomen = selectedGender === 'Women'
    const isMen = selectedGender === 'Men'

    const heroImage = isWomen
        ? '/images/womens-collection.jpg'
        : '/images/mens-collection.jpg'

    const heroLabel = isWomen
        ? 'AURELIA / WOMEN'
        : isMen
            ? 'AURELIA / MEN'
            : 'AURELIA / COLLECTION'

    const heroTitle = isWomen
        ? "WOMEN'S COLLECTION"
        : isMen
            ? "MEN'S COLLECTION"
            : 'CURATED LOOKBOOK'

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f3eadc] px-6 text-[#0b0b0b]">
                <div className="text-center">
                    <p className="mb-4 font-['Cormorant_Garamond'] text-[42px]">
                        Something went wrong
                    </p>
                    <p className="text-[13px] tracking-[1px] text-black/50">{error}</p>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="mt-6 rounded-full bg-black px-6 py-3 text-xs uppercase tracking-[2px] text-white"
                    >
                        Try Again
                    </button>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen w-full overflow-hidden bg-[#f3eadc] text-[#0b0b0b]">

            {/* ================= HERO SECTION ================= */}
            <section className="relative min-h-[55vh] sm:min-h-[65vh] overflow-hidden bg-[#111] text-white">
                <div className="absolute inset-0">
                    <img
                        src={heroImage}
                        alt="AURELIA Collection"
                        className="h-full w-full object-cover object-center transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
                    <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#f3eadc] to-transparent" />
                </div>

                <div className="relative z-10 mx-auto flex min-h-[55vh] sm:min-h-[65vh] max-w-[1500px] items-center px-6 sm:px-10 lg:px-14 pt-24 pb-16">
                    <div className="max-w-[700px]">
                        <p className="mb-4 text-[10px] font-semibold tracking-[4px] text-[#c9ad7a] uppercase">
                            {heroLabel}
                        </p>
                        <h1 className="m-0 font-['Cormorant_Garamond'] text-[clamp(48px,6.5vw,96px)] font-medium leading-[0.88] tracking-[-2px] text-white">
                            {heroTitle}
                        </h1>
                        <p className="mt-6 max-w-[440px] text-xs font-light leading-relaxed tracking-[1px] text-white/75">
                            Sculpted silhouettes, considered proportions, and noble materials designed for an enduring aesthetic.
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= STICKY CONTROLS & FILTER BAR ================= */}
            <section className="sticky top-20 z-30 border-b border-black/[0.08] bg-[#f3eadc]/90 px-6 py-4 backdrop-blur-2xl sm:px-10 lg:px-14">
                <div className="mx-auto flex max-w-[1600px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left: Search Bar */}
                    <div className="relative w-full lg:max-w-xs">
                        <div className="flex h-11 items-center rounded-full border border-black/10 bg-white/60 px-4 backdrop-blur-md focus-within:border-black/30 focus-within:bg-white/80 transition-all">
                            <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4 text-black/40 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="7" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
                            </svg>
                            <input
                                type="search"
                                placeholder="Search collection..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent text-xs text-[#111] outline-none placeholder:text-black/35"
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={() => setSearchTerm('')}
                                    className="text-[10px] text-black/40 hover:text-black"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Center: Category Pills */}
                    <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
                        {/* Gender Pills */}
                        <div className="flex items-center rounded-full border border-black/10 bg-white/40 p-1 backdrop-blur-md mr-2">
                            {genders.map((g) => (
                                <button
                                    key={g}
                                    type="button"
                                    onClick={() => handleGenderChange(g)}
                                    className={`rounded-full px-3.5 py-1 text-[10px] font-medium uppercase tracking-[1.5px] transition-all ${
                                        selectedGender === g
                                            ? 'bg-black text-white shadow-sm'
                                            : 'text-black/60 hover:text-black'
                                    }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>

                        {/* Category Dropdown/Pills */}
                        <div className="flex items-center gap-1.5 overflow-x-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`rounded-full border px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[1.5px] transition-all whitespace-nowrap ${
                                        selectedCategory === cat
                                            ? 'border-[#9b7a45] bg-[#9b7a45] text-white shadow-sm'
                                            : 'border-black/10 bg-white/40 text-black/60 hover:border-black/25 hover:bg-white/70'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Sort & Grid View Switcher */}
                    <div className="flex items-center justify-between gap-3 lg:justify-end">
                        {/* Sort Selector */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                aria-label="Sort products"
                                className="h-11 cursor-pointer appearance-none rounded-full border border-black/10 bg-white/60 pl-4 pr-9 text-[10px] font-medium uppercase tracking-[1.5px] text-[#111] outline-none backdrop-blur-md hover:bg-white/80 transition-all"
                            >
                                <option value="featured">Featured Edit</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Alphabetical</option>
                            </select>
                            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-black/50">
                                ↓
                            </span>
                        </div>

                        {/* Grid Toggle (Desktop) */}
                        <div className="hidden sm:flex items-center rounded-full border border-black/10 bg-white/40 p-1 backdrop-blur-md">
                            <button
                                type="button"
                                onClick={() => setGridCols(4)}
                                className={`rounded-full p-2 transition-all ${
                                    gridCols === 4 ? 'bg-black text-white' : 'text-black/40 hover:text-black'
                                }`}
                                title="4 Column Compact View"
                                aria-label="4 Column View"
                            >
                                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                                    <rect x="2" y="2" width="8" height="8" rx="1" />
                                    <rect x="14" y="2" width="8" height="8" rx="1" />
                                    <rect x="2" y="14" width="8" height="8" rx="1" />
                                    <rect x="14" y="14" width="8" height="8" rx="1" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => setGridCols(2)}
                                className={`rounded-full p-2 transition-all ${
                                    gridCols === 2 ? 'bg-black text-white' : 'text-black/40 hover:text-black'
                                }`}
                                title="2 Column Editorial View"
                                aria-label="2 Column View"
                            >
                                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                                    <rect x="3" y="3" width="7" height="18" rx="1" />
                                    <rect x="14" y="3" width="7" height="18" rx="1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Active Filter Tags Row */}
                {(searchTerm || selectedCategory !== 'All' || selectedGender !== 'All') && (
                    <div className="mx-auto mt-3 flex max-w-[1600px] flex-wrap items-center gap-2 pt-2 border-t border-black/5 text-[9px] uppercase tracking-[1.5px] text-black/60">
                        <span>Active Filters:</span>
                        {selectedGender !== 'All' && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/10 px-3 py-1 text-black font-medium">
                                Gender: {selectedGender}
                                <button type="button" onClick={() => handleGenderChange('All')} className="hover:text-red-600">✕</button>
                            </span>
                        )}
                        {selectedCategory !== 'All' && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/10 px-3 py-1 text-black font-medium">
                                Category: {selectedCategory}
                                <button type="button" onClick={() => handleCategoryChange('All')} className="hover:text-red-600">✕</button>
                            </span>
                        )}
                        {searchTerm && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/10 px-3 py-1 text-black font-medium">
                                Query: "{searchTerm}"
                                <button type="button" onClick={() => setSearchTerm('')} className="hover:text-red-600">✕</button>
                            </span>
                        )}
                        <button
                            type="button"
                            onClick={handleClearAll}
                            className="ml-2 text-[#9b7a45] underline hover:text-black font-semibold"
                        >
                            Reset All
                        </button>
                    </div>
                )}
            </section>

            {/* ================= PRODUCT GRID SECTION ================= */}
            <section id="collection-grid" className="scroll-mt-28 px-6 py-12 sm:px-10 lg:px-14 md:py-16">
                <div className="mx-auto max-w-[1600px]">
                    {/* Header info */}
                    <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-4">
                        <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[3px] text-[#9b7a45]">
                                Aurelia Catalog
                            </p>
                            <h2 className="mt-1 font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-medium">
                                {selectedCategory !== 'All' ? selectedCategory : 'All Curated Pieces'}
                            </h2>
                        </div>
                        <p className="text-xs tracking-[1px] text-black/50">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'} Found
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                <div key={n} className="aspect-[4/5] rounded-2xl bg-black/5 skeleton-shimmer" />
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && filteredProducts.length === 0 && (
                        <div className="flex min-h-[45vh] items-center justify-center">
                            <div className="rounded-3xl border border-black/10 bg-white/40 px-10 py-16 text-center shadow-lg backdrop-blur-xl max-w-md">
                                <h3 className="font-['Cormorant_Garamond'] text-4xl font-medium text-[#111]">
                                    No Pieces Found
                                </h3>
                                <p className="mt-3 text-xs leading-relaxed text-black/50 font-light">
                                    No products matched your exact filter preferences. Try resetting your search or exploring another category.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleClearAll}
                                    className="mt-6 rounded-full bg-black px-8 py-3.5 text-[10px] font-semibold uppercase tracking-[2px] text-white hover:bg-[#9b7a45] transition-all"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Products Display */}
                    {!loading && filteredProducts.length > 0 && (
                        <div
                            className={`grid gap-x-6 gap-y-12 sm:grid-cols-2 ${
                                gridCols === 2 ? 'lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16' : 'lg:grid-cols-4 lg:gap-y-14'
                            }`}
                        >
                            {filteredProducts.map((product) => (
                                <ProductCard key={product._id || product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ================= EDITORIAL PHILOSOPHY STRIP ================= */}
            <section className="border-t border-black/10 bg-[#ebe3d5] px-6 py-20 sm:px-10 lg:px-14">
                <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-8 md:flex-row md:items-end">
                    <div>
                        <p className="text-[9px] uppercase tracking-[3.5px] text-[#9b7a45]">
                            AURELIA PHILOSOPHY
                        </p>
                        <h3 className="mt-3 max-w-2xl font-['Cormorant_Garamond'] text-4xl sm:text-6xl font-medium leading-[0.95]">
                            Elegance is found in the quiet confidence of considered design.
                        </h3>
                    </div>
                    <p className="max-w-xs text-xs leading-relaxed text-black/55 font-light">
                        Every garment and scent is composed to accompany you through life's most meaningful moments.
                    </p>
                </div>
            </section>

        </main>
    )
}

export default Shop
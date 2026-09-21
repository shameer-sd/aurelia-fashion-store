import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const emptyForm = {
    name: '',
    category: '',
    price: '',
    image: '',
    description: '',
    stock: '',
}

/*
|--------------------------------------------------------------------------
| AURELIA PRODUCT IMAGE MAP
|--------------------------------------------------------------------------
| These paths point to files inside:
| client/public/images
|
| IMPORTANT:
| Only products listed here will be changed when "Update Images" is clicked.
| Products without a mapping keep their existing image.
|--------------------------------------------------------------------------
*/

const imageMap = {
    // TEST
    'Gender Test Product':
        '/images/gender-test-product.jpg',

    // SHOES
    'Minimal Court Sneakers':
        '/images/minimal-court-sneakers.jpg',

    'Classic Formal Derby':
        '/images/classic-formal-derby.jpg',

    'Italian Chelsea Boots':
        '/images/italian-chelsea-boots.jpg',

    'Aurelia Leather Loafers':
        '/images/aurelia-leather-loafers.jpg',

    // ACCESSORIES
    'Signature Leather Wallet':
        '/images/signature-leather-wallet.jpg',

    'Aurelia Leather Tote':
        '/images/aurelia-leather-tote.jpg',

    'Classic Leather Belt':
        '/images/classic-leather-belt.jpg',

    'Noir Square Sunglasses':
        '/images/noir-square-sunglasses.jpg',

    'Aurelia Signature Watch':
        '/images/minimalist-watch.jpg',

    'Classic Handbag':
        '/images/classic-handbag.jpg',

    'Womens Sunglasses':
        '/images/womens-sunglasses.jpg',

    // MEN'S CLOTHING
    'Merino Knit Polo':
        '/images/classic-polo-t-shirt.jpg',

    'Classic Tailored Trousers':
        '/images/tailored-chinos.jpg',

    'Aurelia Wool Overcoat':
        '/images/aurelia-wool-overcoat.jpg',

    'Cashmere Knit Sweater':
        '/images/cashmere-sweater.jpg',

    'Essential Linen Shirt':
        '/images/linen-shirt.jpg',

    'Noir Tailored Shirt':
        '/images/noir-tailored-shirt.jpg',

    'Aurelia Signature Blazer':
        '/images/aurelia-signature-blazer.jpg',

    'Raw Denim Jeans':
        '/images/raw-denim-jeans.jpg',

    'Slim Fit Shirt':
        '/images/slim-fit-shirt.jpg',

    // WOMEN'S CLOTHING
    'Tailored Wide-Leg Trousers':
        '/images/tailored-wide-leg-trousers.jpg',

    'Satin Wrap Dress':
        '/images/satin-wrap-dress.jpg',

    'Silk Evening Dress':
        '/images/silk-evening-dress.jpg',

    'Evening Dress':
        '/images/evening-dress.jpg',

    'Essential Crew Neck Tee':
        '/images/essential-crew-neck-tee.jpg',

    'Stiletto Heels':
        '/images/stiletto-heels.jpg',

    // PERFUME
    'Aurelia No. 01 Eau de Parfum':
        '/images/aurelia-no-01-eau-de-parfum.jpg',

    'Aurelia No. 02 Eau de Parfum':
        '/images/aurelia-no-02-eau-de-parfum.jpg',

    // Additional catalog perfume images
    'Signature Pour Homme':
        '/images/signature-pour-homme.jpg',

    'Oud Intense':
        '/images/oud-intense.jpg',

    'Bloom Essence':
        '/images/bloom-essence.jpg',

    'Velvet Rose':
        '/images/velvet-rose.jpg',
}

function AdminProducts() {
    const { token } = useAuth()

    const [products, setProducts] = useState([])
    const [form, setForm] = useState(emptyForm)
    const [editingId, setEditingId] = useState(null)

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [updatingImages, setUpdatingImages] = useState(false)

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    /*
    |--------------------------------------------------------------------------
    | FETCH PRODUCTS
    |--------------------------------------------------------------------------
    */

    const fetchProducts = async () => {
        try {
            setError('')

            const response = await fetch(
                'http://localhost:5000/api/v1/products'
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || 'Failed to load products'
                )
            }

            setProducts(data.products || [])
        } catch (error) {
            setError(
                error.message || 'Unable to load products'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    /*
    |--------------------------------------------------------------------------
    | FORM HANDLING
    |--------------------------------------------------------------------------
    */

    const handleChange = (event) => {
        const { name, value } = event.target

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }))
    }

    const resetForm = () => {
        setForm(emptyForm)
        setEditingId(null)
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE / UPDATE PRODUCT
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!token || saving) {
            setError('You must be logged in as admin.')
            return
        }

        setError('')
        setMessage('')
        setSaving(true)

        try {
            const url = editingId
                ? `http://localhost:5000/api/v1/products/${editingId}`
                : 'http://localhost:5000/api/v1/products'

            const method = editingId ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: form.name,
                    category: form.category,
                    price: Number(form.price),
                    image: form.image,
                    description: form.description,
                    stock: Number(form.stock),
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || 'Failed to save product'
                )
            }

            setMessage(
                editingId
                    ? 'Product updated successfully.'
                    : 'Product created successfully.'
            )

            resetForm()
            await fetchProducts()
        } catch (error) {
            setError(
                error.message || 'Unable to save product'
            )
        } finally {
            setSaving(false)
        }
    }

    /*
    |--------------------------------------------------------------------------
    | EDIT PRODUCT
    |--------------------------------------------------------------------------
    */

    const handleEdit = (product) => {
        setError('')
        setMessage('')

        setEditingId(product._id)

        setForm({
            name: product.name || '',
            category: product.category || '',
            price: product.price ?? '',
            image:
                imageMap[product.name] ||
                product.image ||
                '',
            description: product.description || '',
            stock: product.stock ?? '',
        })

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE PRODUCT
    |--------------------------------------------------------------------------
    */

    const handleDelete = async (productId) => {
        if (!token) {
            setError('You must be logged in as admin.')
            return
        }

        const confirmed = window.confirm(
            'Are you sure you want to delete this product?'
        )

        if (!confirmed) {
            return
        }

        setError('')
        setMessage('')

        try {
            const response = await fetch(
                `http://localhost:5000/api/v1/products/${productId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || 'Failed to delete product'
                )
            }

            setMessage(
                'Product deleted successfully.'
            )

            if (editingId === productId) {
                resetForm()
            }

            await fetchProducts()
        } catch (error) {
            setError(
                error.message ||
                'Unable to delete product'
            )
        }
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE ALL PRODUCT IMAGES
    |--------------------------------------------------------------------------
    */

    const updateAllProductImages = async () => {
        if (!token) {
            setError(
                'You must be logged in as admin.'
            )
            return
        }

        if (updatingImages) {
            return
        }

        setError('')
        setMessage(
            'Updating product images...'
        )
        setUpdatingImages(true)

        let updatedCount = 0
        let skippedProducts = []

        try {
            for (const product of products) {
                const image = imageMap[product.name]

                /*
                |--------------------------------------------------------------------------
                | If we don't have a confirmed image for this exact product,
                | DO NOT overwrite its existing image.
                |--------------------------------------------------------------------------
                */

                if (!image) {
                    skippedProducts.push(product.name)
                    console.warn(
                        `No image mapping found for: ${product.name}`
                    )
                    continue
                }

                try {
                    const response = await fetch(
                        `http://localhost:5000/api/v1/products/${product._id}`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type':
                                    'application/json',
                                Authorization:
                                    `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                name: product.name,
                                category: product.category,
                                price: Number(
                                    product.price
                                ),
                                image,
                                description:
                                    product.description ||
                                    '',
                                stock: Number(
                                    product.stock
                                ),
                            }),
                        }
                    )

                    const data =
                        await response.json()

                    if (!response.ok) {
                        throw new Error(
                            data.message ||
                            `Failed to update ${product.name}`
                        )
                    }

                    updatedCount++
                } catch (productError) {
                    console.error(
                        `Image update failed for ${product.name}:`,
                        productError
                    )

                    skippedProducts.push(
                        product.name
                    )
                }
            }

            await fetchProducts()

            if (skippedProducts.length === 0) {
                setMessage(
                    `All ${updatedCount} product images updated successfully.`
                )
            } else {
                setMessage(
                    `${updatedCount} product images updated. ${skippedProducts.length} product(s) were left unchanged because no confirmed image mapping exists.`
                )
            }
        } catch (error) {
            setError(
                error.message ||
                'Unable to update product images.'
            )
        } finally {
            setUpdatingImages(false)
        }
    }

    /*
    |--------------------------------------------------------------------------
    | GET PRODUCT IMAGE
    |--------------------------------------------------------------------------
    */

    const getProductImage = (product) => {
        return (
            imageMap[product.name] ||
            product.image ||
            ''
        )
    }

    /*
    |--------------------------------------------------------------------------
    | IMAGE FALLBACK
    |--------------------------------------------------------------------------
    */

    const handleImageError = (event) => {
        event.currentTarget.style.display = 'none'

        const fallback =
            event.currentTarget.parentElement.querySelector(
                '[data-image-fallback]'
            )

        if (fallback) {
            fallback.style.display = 'flex'
        }
    }

    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f3eadc] text-[#0b0b0b]">
                <div className="text-center">
                    <p className="mb-3 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
                        AURELIA / ADMIN
                    </p>

                    <p className="font-['Cormorant_Garamond'] text-4xl">
                        Loading Products
                    </p>
                </div>
            </main>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | PAGE
    |--------------------------------------------------------------------------
    */

    return (
        <main className="min-h-screen bg-[#f3eadc] text-[#0b0b0b]">

            {/* HEADER */}

            <section className="border-b border-black/10 px-6 pb-12 pt-32 md:px-10">
                <div className="mx-auto max-w-[1400px]">

                    <Link
                        to="/admin"
                        className="mb-10 inline-flex items-center gap-3 text-[9px] font-medium uppercase tracking-[2px] text-black/50 transition hover:text-black"
                    >
                        <span className="text-base">
                            ←
                        </span>

                        Back to Dashboard
                    </Link>

                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

                        <div>

                            <p className="mb-4 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
                                AURELIA / ADMIN
                            </p>

                            <h1 className="font-['Cormorant_Garamond'] text-6xl font-medium leading-none tracking-[-2px] md:text-8xl">
                                Manage Products
                            </h1>

                        </div>

                        <p className="max-w-[260px] text-[10px] uppercase leading-[1.8] tracking-[2px] text-black/40">
                            Create, edit and manage
                            <br />
                            your AURELIA collection.
                        </p>

                    </div>

                </div>
            </section>

            {/* CONTENT */}

            <section className="px-6 py-12 md:px-10 md:py-16">

                <div className="mx-auto max-w-[1400px]">

                    {/* MESSAGES */}

                    {error && (
                        <div
                            role="alert"
                            className="mb-8 rounded-2xl border border-red-900/10 bg-red-900/[0.04] px-5 py-4 text-xs text-red-900"
                        >
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="mb-8 rounded-2xl border border-[#9b7a45]/20 bg-[#9b7a45]/[0.05] px-5 py-4 text-xs text-[#6f552f]">
                            {message}
                        </div>
                    )}

                    {/* ADD / EDIT PRODUCT */}

                    <section className="mb-20 rounded-[28px] border border-black/10 bg-white/35 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-xl md:p-10">

                        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-black/10 pb-7 md:flex-row md:items-end">

                            <div>

                                <p className="mb-2 text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                                    {editingId
                                        ? 'Product Management'
                                        : 'New Collection Item'}
                                </p>

                                <h2 className="font-['Cormorant_Garamond'] text-4xl font-medium md:text-5xl">
                                    {editingId
                                        ? 'Edit Product'
                                        : 'Add New Product'}
                                </h2>

                            </div>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    disabled={saving}
                                    className="self-start rounded-full border border-black/15 bg-white/40 px-5 py-3 text-[9px] font-medium uppercase tracking-[2px] transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40 md:self-auto"
                                >
                                    Cancel Edit
                                </button>
                            )}

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="grid gap-7 md:grid-cols-2"
                        >

                            {/* NAME */}

                            <div>

                                <label
                                    htmlFor="name"
                                    className="mb-3 block text-[9px] font-medium uppercase tracking-[2px] text-black/50"
                                >
                                    Product Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Essential Linen Shirt"
                                    className="h-14 w-full rounded-2xl border border-black/10 bg-white/55 px-5 text-sm outline-none backdrop-blur-xl transition placeholder:text-black/25 focus:border-black/30 focus:bg-white/75"
                                />

                            </div>

                            {/* CATEGORY */}

                            <div>

                                <label
                                    htmlFor="category"
                                    className="mb-3 block text-[9px] font-medium uppercase tracking-[2px] text-black/50"
                                >
                                    Category
                                </label>

                                <input
                                    id="category"
                                    name="category"
                                    type="text"
                                    value={form.category}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Clothing"
                                    className="h-14 w-full rounded-2xl border border-black/10 bg-white/55 px-5 text-sm outline-none backdrop-blur-xl transition placeholder:text-black/25 focus:border-black/30 focus:bg-white/75"
                                />

                            </div>

                            {/* PRICE */}

                            <div>

                                <label
                                    htmlFor="price"
                                    className="mb-3 block text-[9px] font-medium uppercase tracking-[2px] text-black/50"
                                >
                                    Price (INR)
                                </label>

                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                    placeholder="4999"
                                    className="h-14 w-full rounded-2xl border border-black/10 bg-white/55 px-5 text-sm outline-none backdrop-blur-xl transition placeholder:text-black/25 focus:border-black/30 focus:bg-white/75"
                                />

                            </div>

                            {/* STOCK */}

                            <div>

                                <label
                                    htmlFor="stock"
                                    className="mb-3 block text-[9px] font-medium uppercase tracking-[2px] text-black/50"
                                >
                                    Stock
                                </label>

                                <input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={form.stock}
                                    onChange={handleChange}
                                    required
                                    placeholder="25"
                                    className="h-14 w-full rounded-2xl border border-black/10 bg-white/55 px-5 text-sm outline-none backdrop-blur-xl transition placeholder:text-black/25 focus:border-black/30 focus:bg-white/75"
                                />

                            </div>

                            {/* IMAGE */}

                            <div className="md:col-span-2">

                                <label
                                    htmlFor="image"
                                    className="mb-3 block text-[9px] font-medium uppercase tracking-[2px] text-black/50"
                                >
                                    Image Path
                                </label>

                                <input
                                    id="image"
                                    name="image"
                                    type="text"
                                    value={form.image}
                                    onChange={handleChange}
                                    required
                                    placeholder="/images/product-name.jpg"
                                    className="h-14 w-full rounded-2xl border border-black/10 bg-white/55 px-5 text-sm outline-none backdrop-blur-xl transition placeholder:text-black/25 focus:border-black/30 focus:bg-white/75"
                                />

                                <p className="mt-2 text-[8px] uppercase tracking-[1.5px] text-black/30">
                                    Example: /images/classic-formal-derby.jpg
                                </p>

                            </div>

                            {/* DESCRIPTION */}

                            <div className="md:col-span-2">

                                <label
                                    htmlFor="description"
                                    className="mb-3 block text-[9px] font-medium uppercase tracking-[2px] text-black/50"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Describe the product..."
                                    className="w-full resize-none rounded-2xl border border-black/10 bg-white/55 px-5 py-4 text-sm outline-none backdrop-blur-xl transition placeholder:text-black/25 focus:border-black/30 focus:bg-white/75"
                                />

                            </div>

                            {/* SUBMIT */}

                            <div className="md:col-span-2">

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="min-h-[54px] w-full rounded-full border border-black bg-black px-7 text-[9px] font-medium uppercase tracking-[2.5px] text-white transition hover:border-[#9b7a45] hover:bg-[#9b7a45] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {saving
                                        ? 'Saving...'
                                        : editingId
                                            ? 'Update Product'
                                            : 'Create Product'}
                                </button>

                            </div>

                        </form>

                    </section>

                    {/* PRODUCTS */}

                    <section>

                        <div className="mb-8 flex flex-col gap-5 border-b border-black/10 pb-5 md:flex-row md:items-end md:justify-between">

                            <div>

                                <p className="mb-2 text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                                    Collection
                                </p>

                                <h2 className="font-['Cormorant_Garamond'] text-4xl font-medium">
                                    Products
                                </h2>

                            </div>

                            <div className="flex flex-wrap items-center gap-3">

                                <p className="text-[9px] uppercase tracking-[2px] text-black/40">
                                    {products.length} items
                                </p>

                                <button
                                    type="button"
                                    onClick={updateAllProductImages}
                                    disabled={
                                        updatingImages ||
                                        products.length === 0
                                    }
                                    className="rounded-full border border-black bg-black px-5 py-3 text-[8px] font-medium uppercase tracking-[1.5px] text-white transition hover:border-[#9b7a45] hover:bg-[#9b7a45] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {updatingImages
                                        ? 'Updating Images...'
                                        : 'Update Images'}
                                </button>

                            </div>

                        </div>

                        {products.length === 0 ? (

                            <div className="rounded-[28px] border border-black/10 bg-white/30 p-16 text-center backdrop-blur-xl">

                                <p className="font-['Cormorant_Garamond'] text-3xl">
                                    No products found
                                </p>

                                <p className="mt-3 text-[9px] uppercase tracking-[2px] text-black/40">
                                    Add your first product above.
                                </p>

                            </div>

                        ) : (

                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                                {products.map((product) => {

                                    const productImage =
                                        getProductImage(product)

                                    return (
                                        <article
                                            key={product._id}
                                            className="group overflow-hidden rounded-[24px] border border-black/10 bg-white/35 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                                        >

                                            {/* PRODUCT IMAGE */}

                                            <div className="relative aspect-[3/4] overflow-hidden bg-[#e8dfd2]">

                                                {productImage && (
                                                    <img
                                                        src={productImage}
                                                        alt={product.name}
                                                        onError={
                                                            handleImageError
                                                        }
                                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                                    />
                                                )}

                                                <div
                                                    data-image-fallback
                                                    className={`absolute inset-0 items-center justify-center ${productImage
                                                        ? 'hidden'
                                                        : 'flex'
                                                        }`}
                                                >

                                                    <div className="text-center">

                                                        <p className="text-[8px] font-medium uppercase tracking-[3px] text-black/30">
                                                            AURELIA
                                                        </p>

                                                        <p className="mt-2 font-['Cormorant_Garamond'] text-2xl text-black/45">
                                                            Image Coming Soon
                                                        </p>

                                                    </div>

                                                </div>

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                                                <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/35 px-3 py-2 text-[8px] font-medium uppercase tracking-[1.5px] text-white backdrop-blur-xl">
                                                    {product.category}
                                                </span>

                                            </div>

                                            {/* PRODUCT INFO */}

                                            <div className="p-6">

                                                <h3 className="font-['Cormorant_Garamond'] text-3xl font-medium leading-none">
                                                    {product.name}
                                                </h3>

                                                <div className="mt-5 grid grid-cols-2 gap-4 border-y border-black/10 py-4">

                                                    <div>

                                                        <p className="text-[8px] uppercase tracking-[1.5px] text-black/40">
                                                            Price
                                                        </p>

                                                        <p className="mt-1 text-sm font-medium">
                                                            ₹
                                                            {Number(
                                                                product.price
                                                            ).toLocaleString(
                                                                'en-IN'
                                                            )}
                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-[8px] uppercase tracking-[1.5px] text-black/40">
                                                            Stock
                                                        </p>

                                                        <p className="mt-1 text-sm font-medium">
                                                            {product.stock}
                                                        </p>

                                                    </div>

                                                </div>

                                                {product.gender && (
                                                    <p className="mt-4 text-[8px] font-medium uppercase tracking-[2px] text-[#9b7a45]">
                                                        {product.gender}
                                                    </p>
                                                )}

                                                <p className="mt-4 min-h-[48px] text-[11px] leading-[1.7] text-black/55">
                                                    {product.description ||
                                                        'No description available.'}
                                                </p>

                                                <div className="mt-6 grid grid-cols-2 gap-3">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                product
                                                            )
                                                        }
                                                        className="min-h-[46px] rounded-full border border-black/15 bg-white/40 text-[9px] font-medium uppercase tracking-[2px] transition hover:bg-black hover:text-white"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                product._id
                                                            )
                                                        }
                                                        className="min-h-[46px] rounded-full border border-red-900/15 bg-red-900/[0.03] text-[9px] font-medium uppercase tracking-[2px] text-red-900/70 transition hover:bg-red-900 hover:text-white"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </div>

                                        </article>
                                    )
                                })}

                            </div>

                        )}

                    </section>

                </div>

            </section>

        </main>
    )
}

export default AdminProducts
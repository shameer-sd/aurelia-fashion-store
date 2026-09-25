import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import API_URL from '../utils/api'

function Checkout() {
    const { cartItems, clearCart } = useCart()
    const { user, token } = useAuth()
    const navigate = useNavigate()

    const [shippingAddress, setShippingAddress] = useState({
        fullName: user?.name || '',
        phone: '',
        addressLine: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
    })

    const [placingOrder, setPlacingOrder] = useState(false)
    const [error, setError] = useState('')

    const total = cartItems.reduce(
        (sum, item) =>
            sum + Number(item.price) * Number(item.quantity),
        0
    )

    const handleChange = (event) => {
        const { name, value } = event.target

        setShippingAddress((currentAddress) => ({
            ...currentAddress,
            [name]: value,
        }))
    }

    const loadRazorpay = () => {
        return new Promise((resolve, reject) => {
            if (window.Razorpay) {
                resolve(true)
                return
            }

            const script = document.createElement('script')

            script.src =
                'https://checkout.razorpay.com/v1/checkout.js'

            script.onload = () => {
                resolve(true)
            }

            script.onerror = () => {
                reject(
                    new Error(
                        'Unable to load Razorpay. Please check your internet connection.'
                    )
                )
            }

            document.body.appendChild(script)
        })
    }

    const createAureliaOrder = async () => {
        const response = await fetch(`${API_URL}/api/v1/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                items: cartItems.map((item) => ({
                    product: item._id || item.id,
                    quantity: item.quantity,
                })),
                shippingAddress,
            }),
        }
        )

        const data = await response.json()

        if (!response.ok) {
            if (
                response.status === 400 &&
                data.message
                    ?.toLowerCase()
                    .includes('not enough stock')
            ) {
                throw new Error(
                    `Stock changed for one of the products. ${data.message}. Please return to your cart and adjust the quantity.`
                )
            }

            throw new Error(
                data.message ||
                'Payment succeeded but order creation failed'
            )
        }

        return data
    }

    const placeOrder = async (event) => {
        event.preventDefault()

        if (placingOrder) {
            return
        }

        if (!user || !token) {
            navigate('/login')
            return
        }

        setError('')
        setPlacingOrder(true)

        try {
            // ==========================================
            // STEP 1 — LOAD RAZORPAY CHECKOUT
            // ==========================================

            await loadRazorpay()

            // ==========================================
            // STEP 2 — CREATE RAZORPAY ORDER
            // ==========================================

            const razorpayOrderResponse = await fetch(
                `${API_URL}/api/v1/payments/create-order`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        amount: total,
                    }),
                }
            )

            const razorpayData =
                await razorpayOrderResponse.json()

            if (!razorpayOrderResponse.ok) {
                throw new Error(
                    razorpayData.message ||
                    'Unable to create payment order'
                )
            }

            if (
                !razorpayData.order ||
                !razorpayData.order.id ||
                !razorpayData.keyId
            ) {
                throw new Error(
                    'Invalid Razorpay order response'
                )
            }

            // ==========================================
            // STEP 3 — OPEN RAZORPAY CHECKOUT
            // ==========================================

            const options = {
                key: razorpayData.keyId,

                amount: razorpayData.order.amount,

                currency: 'INR',

                name: 'AURELIA',

                description: 'AURELIA Fashion Order',

                order_id: razorpayData.order.id,

                prefill: {
                    name: shippingAddress.fullName,
                    contact: shippingAddress.phone,
                    email: user?.email || '',
                },

                notes: {
                    brand: 'AURELIA',
                },

                theme: {
                    color: '#111111',
                },

                handler: async function (response) {
                    try {
                        // ==========================================
                        // STEP 4 — VERIFY PAYMENT
                        // ==========================================

                        const verifyResponse = await fetch(`${API_URL}/api/v1/payments/verify`, {
                            method: 'POST',
                            headers: {
                                'Content-Type':
                                    'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                razorpay_order_id:
                                    response.razorpay_order_id,

                                razorpay_payment_id:
                                    response.razorpay_payment_id,

                                razorpay_signature:
                                    response.razorpay_signature,
                            }),
                        }
                        )

                        const verifyData =
                            await verifyResponse.json()

                        if (!verifyResponse.ok) {
                            throw new Error(
                                verifyData.message ||
                                'Payment verification failed'
                            )
                        }

                        // ==========================================
                        // STEP 5 — CREATE AURELIA ORDER
                        // ==========================================

                        await createAureliaOrder()

                        // ==========================================
                        // STEP 6 — SUCCESS
                        // ==========================================

                        clearCart()

                        navigate('/orders')
                    } catch (error) {
                        console.error(
                            'Post-payment order error:',
                            error
                        )

                        setError(
                            error.message ||
                            'Payment was successful, but we could not complete your order.'
                        )

                        setPlacingOrder(false)
                    }
                },

                modal: {
                    ondismiss: function () {
                        setPlacingOrder(false)
                    },
                },
            }

            const razorpay = new window.Razorpay(options)

            razorpay.on(
                'payment.failed',
                function (response) {
                    console.error(
                        'Razorpay payment failed:',
                        response.error
                    )

                    setError(
                        response.error?.description ||
                        'Payment failed. Please try again.'
                    )

                    setPlacingOrder(false)
                }
            )

            razorpay.open()
        } catch (error) {
            console.error(
                'Razorpay checkout error:',
                error
            )

            setError(
                error.message ||
                'Unable to start payment. Please try again.'
            )

            setPlacingOrder(false)
        }
    }

    /* ================= EMPTY CART ================= */

    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen bg-[#f3eadc] text-[#2c2925]">
                <section className="px-6 pb-20 pt-32 md:px-10">
                    <div className="mx-auto max-w-[1400px]">
                        <p className="mb-5 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
                            AURELIA / CHECKOUT
                        </p>

                        <h1 className="font-['Cormorant_Garamond'] text-[68px] font-medium leading-[0.82] tracking-[-2px] md:text-[105px]">
                            CHECK
                            <br />
                            OUT
                        </h1>

                        <div className="mt-12 max-w-[600px] rounded-[30px] border border-black/10 bg-white/35 px-7 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.03)] backdrop-blur-xl md:px-10">
                            <p className="text-[8px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
                                YOUR BAG IS EMPTY
                            </p>

                            <h2 className="mt-5 font-['Cormorant_Garamond'] text-4xl font-medium md:text-5xl">
                                Nothing to checkout
                            </h2>

                            <p className="mx-auto mt-4 max-w-[390px] text-[10px] leading-[2] tracking-[1px] text-black/45">
                                Add some pieces to your
                                shopping bag before
                                continuing to checkout.
                            </p>

                            <Link
                                to="/shop"
                                className="mt-8 inline-flex min-h-[54px] items-center justify-center rounded-full border border-black bg-black px-9 text-[9px] font-medium uppercase tracking-[2.5px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9b7a45] hover:bg-[#9b7a45]"
                                style={{ color: '#ffffff' }}
                            >
                                Continue Shopping

                                <span className="ml-5 text-base">
                                    →
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#f3eadc] text-[#2c2925]">
            {/* ================= HEADER ================= */}

            <section className="border-b border-black/10 px-6 pb-14 pt-32 md:px-10">
                <div className="mx-auto max-w-[1400px]">
                    <p className="mb-5 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
                        AURELIA / CHECKOUT
                    </p>

                    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                        <div>
                            <h1 className="font-['Cormorant_Garamond'] text-[68px] font-medium leading-[0.82] tracking-[-2px] md:text-[105px]">
                                CHECK
                                <br />
                                OUT
                            </h1>

                            <p className="mt-8 max-w-[450px] text-[10px] uppercase leading-[2] tracking-[2px] text-black/45">
                                Complete your details
                                <br />
                                to place your order.
                            </p>
                        </div>

                        <div className="text-left md:text-right">
                            <p className="text-[8px] uppercase leading-[2] tracking-[3px] text-black/35">
                                SECURE ORDER
                                <br />
                                AURELIA / 2026
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CONTENT ================= */}

            <section className="px-6 py-14 md:px-10 md:py-20">
                <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_420px] lg:items-start lg:gap-14">
                    {/* ================= SHIPPING FORM ================= */}

                    <section>
                        <div className="mb-8">
                            <p className="mb-2 text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                                Step 01
                            </p>

                            <h2 className="font-['Cormorant_Garamond'] text-4xl font-medium md:text-5xl">
                                Shipping Information
                            </h2>

                            <p className="mt-4 max-w-[500px] text-[9px] uppercase leading-[2] tracking-[1.5px] text-black/40">
                                Where should we deliver
                                your AURELIA selection?
                            </p>
                        </div>

                        <form
                            onSubmit={placeOrder}
                            className="rounded-[30px] border border-black/10 bg-white/35 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.03)] backdrop-blur-xl md:p-9"
                        >
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* FULL NAME */}

                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="fullName"
                                        className="mb-3 block text-[8px] font-medium uppercase tracking-[2px] text-black/50"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={
                                            shippingAddress.fullName
                                        }
                                        onChange={handleChange}
                                        required
                                        className="h-14 w-full rounded-2xl border border-black/10 bg-white/40 px-5 text-[11px] text-[#2c2925] outline-none transition-all duration-300 placeholder:text-black/25 focus:border-[#9b7a45]/50 focus:bg-white/60 focus:ring-2 focus:ring-[#9b7a45]/10"
                                    />
                                </div>

                                {/* PHONE */}

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-3 block text-[8px] font-medium uppercase tracking-[2px] text-black/50"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={
                                            shippingAddress.phone
                                        }
                                        onChange={handleChange}
                                        required
                                        className="h-14 w-full rounded-2xl border border-black/10 bg-white/40 px-5 text-[11px] outline-none transition-all duration-300 focus:border-[#9b7a45]/50 focus:bg-white/60 focus:ring-2 focus:ring-[#9b7a45]/10"
                                    />
                                </div>

                                {/* COUNTRY */}

                                <div>
                                    <label
                                        htmlFor="country"
                                        className="mb-3 block text-[8px] font-medium uppercase tracking-[2px] text-black/50"
                                    >
                                        Country
                                    </label>

                                    <input
                                        id="country"
                                        name="country"
                                        type="text"
                                        value={
                                            shippingAddress.country
                                        }
                                        onChange={handleChange}
                                        required
                                        className="h-14 w-full rounded-2xl border border-black/10 bg-white/40 px-5 text-[11px] outline-none transition-all duration-300 focus:border-[#9b7a45]/50 focus:bg-white/60 focus:ring-2 focus:ring-[#9b7a45]/10"
                                    />
                                </div>

                                {/* ADDRESS */}

                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="addressLine"
                                        className="mb-3 block text-[8px] font-medium uppercase tracking-[2px] text-black/50"
                                    >
                                        Address
                                    </label>

                                    <textarea
                                        id="addressLine"
                                        name="addressLine"
                                        value={
                                            shippingAddress.addressLine
                                        }
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full resize-none rounded-2xl border border-black/10 bg-white/40 px-5 py-4 text-[11px] leading-[1.7] outline-none transition-all duration-300 focus:border-[#9b7a45]/50 focus:bg-white/60 focus:ring-2 focus:ring-[#9b7a45]/10"
                                    />
                                </div>

                                {/* CITY */}

                                <div>
                                    <label
                                        htmlFor="city"
                                        className="mb-3 block text-[8px] font-medium uppercase tracking-[2px] text-black/50"
                                    >
                                        City
                                    </label>

                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={
                                            shippingAddress.city
                                        }
                                        onChange={handleChange}
                                        required
                                        className="h-14 w-full rounded-2xl border border-black/10 bg-white/40 px-5 text-[11px] outline-none transition-all duration-300 focus:border-[#9b7a45]/50 focus:bg-white/60 focus:ring-2 focus:ring-[#9b7a45]/10"
                                    />
                                </div>

                                {/* STATE */}

                                <div>
                                    <label
                                        htmlFor="state"
                                        className="mb-3 block text-[8px] font-medium uppercase tracking-[2px] text-black/50"
                                    >
                                        State
                                    </label>

                                    <input
                                        id="state"
                                        name="state"
                                        type="text"
                                        value={
                                            shippingAddress.state
                                        }
                                        onChange={handleChange}
                                        required
                                        className="h-14 w-full rounded-2xl border border-black/10 bg-white/40 px-5 text-[11px] outline-none transition-all duration-300 focus:border-[#9b7a45]/50 focus:bg-white/60 focus:ring-2 focus:ring-[#9b7a45]/10"
                                    />
                                </div>

                                {/* POSTAL CODE */}

                                <div>
                                    <label
                                        htmlFor="postalCode"
                                        className="mb-3 block text-[8px] font-medium uppercase tracking-[2px] text-black/50"
                                    >
                                        Postal Code
                                    </label>

                                    <input
                                        id="postalCode"
                                        name="postalCode"
                                        type="text"
                                        value={
                                            shippingAddress.postalCode
                                        }
                                        onChange={handleChange}
                                        required
                                        className="h-14 w-full rounded-2xl border border-black/10 bg-white/40 px-5 text-[11px] outline-none transition-all duration-300 focus:border-[#9b7a45]/50 focus:bg-white/60 focus:ring-2 focus:ring-[#9b7a45]/10"
                                    />
                                </div>
                            </div>

                            {/* ERROR */}

                            {error && (
                                <div
                                    role="alert"
                                    className="mt-7 rounded-2xl border border-red-900/10 bg-red-900/[0.035] px-5 py-4 text-[9px] uppercase leading-[1.8] tracking-[1px] text-red-900/70"
                                >
                                    {error}
                                </div>
                            )}

                            {/* MOBILE SUBMIT */}

                            <button
                                type="submit"
                                disabled={placingOrder}
                                className="mt-8 flex min-h-[56px] w-full items-center justify-center rounded-full border border-black bg-black px-6 text-[9px] font-medium uppercase tracking-[2.5px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9b7a45] hover:bg-[#9b7a45] disabled:cursor-not-allowed disabled:opacity-50 lg:hidden"
                            >
                                {placingOrder
                                    ? 'Opening Payment...'
                                    : 'Pay with Razorpay'}

                                {!placingOrder && (
                                    <span className="ml-5 text-base">
                                        →
                                    </span>
                                )}
                            </button>
                        </form>
                    </section>

                    {/* ================= ORDER SUMMARY ================= */}

                    <aside className="lg:sticky lg:top-28">
                        <div className="rounded-[30px] border border-black/10 bg-white/45 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-xl md:p-8">
                            <p className="text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                                Step 02
                            </p>

                            <h2 className="mt-3 font-['Cormorant_Garamond'] text-4xl font-medium">
                                Order Summary
                            </h2>

                            <div className="my-7 h-px bg-black/10" />

                            {/* ITEMS */}

                            <div className="space-y-5">
                                {cartItems.map((item) => (
                                    <article
                                        key={
                                            item._id ||
                                            item.id
                                        }
                                        className="border-b border-black/10 pb-5 last:border-0 last:pb-0"
                                    >
                                        <div className="flex gap-4">
                                            {item.image && (
                                                <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-[#e7ddcf]">
                                                    <img
                                                        src={
                                                            item.image
                                                        }
                                                        alt={
                                                            item.name
                                                        }
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            )}

                                            <div className="min-w-0 flex-1">
                                                <p className="text-[7px] uppercase tracking-[2px] text-[#9b7a45]">
                                                    {
                                                        item.category
                                                    }
                                                </p>

                                                <h3 className="mt-1 truncate font-['Cormorant_Garamond'] text-xl font-medium">
                                                    {
                                                        item.name
                                                    }
                                                </h3>

                                                <p className="mt-2 text-[9px] text-black/40">
                                                    ₹
                                                    {Number(
                                                        item.price
                                                    ).toFixed(2)}{' '}
                                                    ×{' '}
                                                    {
                                                        item.quantity
                                                    }
                                                </p>
                                            </div>

                                            <p className="shrink-0 font-['Cormorant_Garamond'] text-xl font-medium">
                                                ₹
                                                {(
                                                    Number(
                                                        item.price
                                                    ) *
                                                    Number(
                                                        item.quantity
                                                    )
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <div className="my-7 h-px bg-black/10" />

                            {/* TOTAL */}

                            <div className="flex items-end justify-between gap-5">
                                <div>
                                    <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                                        Total
                                    </p>

                                    <p className="mt-1 text-[7px] uppercase tracking-[1.5px] text-black/30">
                                        Secure payment via Razorpay
                                    </p>
                                </div>

                                <p className="font-['Cormorant_Garamond'] text-4xl font-medium">
                                    ₹{total.toFixed(2)}
                                </p>
                            </div>

                            {/* DESKTOP SUBMIT */}

                            <button
                                type="button"
                                disabled={placingOrder}
                                onClick={placeOrder}
                                className="mt-8 hidden min-h-[56px] w-full items-center justify-center rounded-full border border-black bg-black px-6 text-[9px] font-medium uppercase tracking-[2.5px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9b7a45] hover:bg-[#9b7a45] disabled:cursor-not-allowed disabled:opacity-50 lg:flex"
                            >
                                {placingOrder
                                    ? 'Opening Payment...'
                                    : 'Pay with Razorpay'}

                                {!placingOrder && (
                                    <span className="ml-5 text-base">
                                        →
                                    </span>
                                )}
                            </button>

                            <Link
                                to="/cart"
                                className="mt-4 flex min-h-[50px] items-center justify-center rounded-full border border-black/15 bg-white/30 px-6 text-[9px] font-medium uppercase tracking-[2px] text-[#2c2925] transition-all duration-300 hover:border-black/30 hover:bg-white/60"
                            >
                                Return to Cart
                            </Link>

                            <p className="mt-6 text-center text-[7px] uppercase leading-[1.8] tracking-[1.5px] text-black/30">
                                Your payment will be
                                securely processed
                                by Razorpay.
                            </p>
                        </div>
                    </aside>
                </div>

                {/* ================= FOOTER NOTE ================= */}

                <div className="mx-auto mt-20 flex max-w-[1400px] flex-col justify-between gap-4 border-t border-black/10 pt-7 text-[8px] uppercase tracking-[2.5px] text-black/30 sm:flex-row">
                    <p>AURELIA / CHECKOUT</p>
                    <p>EST. 2026</p>
                </div>
            </section>
        </main>
    )
}

export default Checkout
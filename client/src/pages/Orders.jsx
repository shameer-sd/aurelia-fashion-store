import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getProductImageUrl } from '../utils/productImages'
import API_URL from '../utils/api'

function Orders() {
    const { token } = useAuth()

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/v1/orders/my-orders`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(
                        data.message || 'Failed to load orders'
                    )
                }

                setOrders(data.orders || [])
            } catch (error) {
                setError(
                    error.message || 'Unable to load orders'
                )
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            fetchOrders()
        }
    }, [token])

    /* ================= LOADING ================= */

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f3eadc] text-[#2c2925]">
                <section className="px-6 pb-20 pt-32 md:px-10">
                    <div className="mx-auto max-w-[1400px]">
                        <p className="mb-5 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
                            AURELIA / ACCOUNT
                        </p>

                        <h1 className="font-['Cormorant_Garamond'] text-[68px] font-medium leading-[0.85] tracking-[-2px] md:text-[105px]">
                            MY
                            <br />
                            ORDERS
                        </h1>

                        <div className="mt-16 rounded-[30px] border border-black/10 bg-white/40 p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.03)] backdrop-blur-xl">
                            <p className="text-[9px] uppercase tracking-[3px] text-black/40">
                                Loading orders...
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

    /* ================= ERROR ================= */

    if (error) {
        return (
            <main className="min-h-screen bg-[#f3eadc] text-[#2c2925]">
                <section className="px-6 pb-20 pt-32 md:px-10">
                    <div className="mx-auto max-w-[1400px]">
                        <p className="mb-5 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
                            AURELIA / ACCOUNT
                        </p>

                        <h1 className="font-['Cormorant_Garamond'] text-[68px] font-medium leading-[0.85] tracking-[-2px] md:text-[105px]">
                            MY
                            <br />
                            ORDERS
                        </h1>

                        <div className="mt-16 max-w-[700px] rounded-[30px] border border-black/10 bg-white/40 p-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] backdrop-blur-xl">
                            <p className="text-[9px] uppercase tracking-[3px] text-[#9b7a45]">
                                Unable to load orders
                            </p>

                            <p
                                role="alert"
                                className="mt-5 text-sm text-black/60"
                            >
                                {error}
                            </p>

                            <Link
                                to="/shop"
                                style={{
                                    color: '#ffffff',
                                    backgroundColor: '#000000',
                                }}
                                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-[#9b7a45] hover:text-black"
                            >
                                <span style={{ color: '#ffffff' }}>
                                    Continue Shopping
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

    /* ================= EMPTY ================= */

    if (orders.length === 0) {
        return (
            <main className="min-h-screen bg-[#f3eadc] text-[#2c2925]">
                <section className="px-6 pb-20 pt-32 md:px-10">
                    <div className="mx-auto max-w-[1400px]">
                        <p className="mb-5 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
                            AURELIA / ACCOUNT
                        </p>

                        <h1 className="font-['Cormorant_Garamond'] text-[68px] font-medium leading-[0.85] tracking-[-2px] md:text-[105px]">
                            MY
                            <br />
                            ORDERS
                        </h1>

                        <div className="mt-16 max-w-[650px] rounded-[30px] border border-black/10 bg-white/40 p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.03)] backdrop-blur-xl md:p-14">
                            <p className="text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
                                YOUR ORDER HISTORY
                            </p>

                            <h2 className="mt-5 font-['Cormorant_Garamond'] text-4xl font-medium md:text-5xl">
                                No orders yet
                            </h2>

                            <p className="mx-auto mt-4 max-w-[400px] text-[10px] leading-[2] tracking-[1px] text-black/45">
                                Your AURELIA selections will appear
                                here once you place your first order.
                            </p>

                            <Link
                                to="/shop"
                                className="
                                    mt-8
                                    inline-flex
                                    min-h-[54px]
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-black
                                    bg-black
                                    px-10
                                    text-[9px]
                                    font-medium
                                    uppercase
                                    tracking-[2.5px]
                                    text-white
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:border-[#9b7a45]
                                    hover:bg-[#9b7a45]
                                    hover:text-black
                                "
                            >
                                Start Shopping
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

    /* ================= ORDERS ================= */

    return (
        <main className="min-h-screen bg-[#f3eadc] text-[#2c2925]">
            {/* ================= HEADER ================= */}

            <section className="border-b border-black/10 px-6 pb-14 pt-32 md:px-10">
                <div className="mx-auto max-w-[1400px]">
                    <p className="mb-5 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
                        AURELIA / ACCOUNT
                    </p>

                    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                        <div>
                            <h1 className="font-['Cormorant_Garamond'] text-[68px] font-medium leading-[0.82] tracking-[-2px] md:text-[105px]">
                                MY
                                <br />
                                ORDERS
                            </h1>

                            <p className="mt-8 max-w-[500px] text-[10px] uppercase leading-[2] tracking-[2px] text-black/45">
                                A record of your AURELIA
                                <br />
                                selections and purchases.
                            </p>
                        </div>

                        <div className="text-left md:text-right">
                            <p className="text-[8px] uppercase leading-[2] tracking-[3px] text-black/35">
                                ORDER HISTORY
                                <br />
                                AURELIA / 2026
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= ORDER LIST ================= */}

            <section className="px-6 py-14 md:px-10 md:py-20">
                <div className="mx-auto max-w-[1400px]">
                    <div className="mb-10 flex items-end justify-between border-b border-black/10 pb-5">
                        <div>
                            <p className="text-[8px] uppercase tracking-[3px] text-[#9b7a45]">
                                YOUR HISTORY
                            </p>

                            <h2 className="mt-2 font-['Cormorant_Garamond'] text-4xl font-medium">
                                Recent Orders
                            </h2>
                        </div>

                        <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                            {orders.length}{' '}
                            {orders.length === 1
                                ? 'ORDER'
                                : 'ORDERS'}
                        </p>
                    </div>

                    <div className="space-y-8">
                        {orders.map((order) => {
                            const itemCount = order.items.reduce(
                                (total, item) =>
                                    total + item.quantity,
                                0
                            )

                            const shippingAddress =
                                order.shippingAddress

                            return (
                                <article
                                    key={order._id}
                                    className="
                                        overflow-hidden
                                        rounded-[30px]
                                        border
                                        border-black/10
                                        bg-white/40
                                        shadow-[0_20px_60px_rgba(0,0,0,0.03)]
                                        backdrop-blur-xl
                                    "
                                >
                                    {/* ORDER HEADER */}

                                    <div className="border-b border-black/10 px-7 py-7 md:px-10 md:py-8">
                                        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                                            <div>
                                                <p className="text-[8px] uppercase tracking-[3px] text-[#9b7a45]">
                                                    ORDER
                                                </p>

                                                <h2 className="mt-2 break-all font-['Cormorant_Garamond'] text-2xl font-medium md:text-3xl">
                                                    #{order._id}
                                                </h2>
                                            </div>

                                            <div className="inline-flex w-fit items-center rounded-full border border-[#9b7a45]/25 bg-[#9b7a45]/10 px-5 py-2.5">
                                                <span className="text-[8px] font-medium uppercase tracking-[2px] text-[#8b6c3e]">
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ORDER META */}

                                    <div className="grid border-b border-black/10 md:grid-cols-3">
                                        <div className="border-b border-black/10 px-7 py-6 md:border-b-0 md:border-r md:px-10">
                                            <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                                                Date
                                            </p>

                                            <p className="mt-2 text-sm text-[#2c2925]">
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="border-b border-black/10 px-7 py-6 md:border-b-0 md:border-r md:px-10">
                                            <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                                                Items
                                            </p>

                                            <p className="mt-2 text-sm text-[#2c2925]">
                                                {itemCount}
                                            </p>
                                        </div>

                                        <div className="px-7 py-6 md:px-10">
                                            <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                                                Total
                                            </p>

                                            <p className="mt-1 font-['Cormorant_Garamond'] text-3xl font-medium">
                                                ₹
                                                {Number(
                                                    order.totalAmount
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* ITEMS */}

                                    <div className="px-7 py-8 md:px-10">
                                        <div className="mb-5 flex items-center justify-between">
                                            <p className="text-[8px] uppercase tracking-[3px] text-[#9b7a45]">
                                                ITEMS
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            {order.items.map(
                                                (
                                                    item,
                                                    index
                                                ) => {
                                                    const itemImage = getProductImageUrl(item)

                                                    return (
                                                        <div
                                                            key={
                                                                index
                                                            }
                                                            className="
                                                                flex
                                                                flex-col
                                                                justify-between
                                                                gap-4
                                                                border-b
                                                                border-black/10
                                                                pb-4
                                                                sm:flex-row
                                                                sm:items-center
                                                            "
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className="relative aspect-[4/5] h-16 w-13 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-[#e7ddcf]">
                                                                    {itemImage ? (
                                                                        <img
                                                                            src={itemImage}
                                                                            alt={item.name}
                                                                            onError={(e) => {
                                                                                e.currentTarget.style.display = 'none'
                                                                            }}
                                                                            className="h-full w-full object-cover object-center"
                                                                        />
                                                                    ) : null}
                                                                    <div className="absolute inset-0 -z-0 flex items-center justify-center font-['Cormorant_Garamond'] text-sm text-black/30">
                                                                        A
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <h3 className="font-['Cormorant_Garamond'] text-xl font-medium">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </h3>

                                                                    <p className="mt-1 text-[9px] uppercase tracking-[1.5px] text-black/35">
                                                                        ₹
                                                                        {
                                                                            item.price
                                                                        }{' '}
                                                                        ×{' '}
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <p className="font-['Cormorant_Garamond'] text-xl font-medium">
                                                                ₹
                                                                {(
                                                                    item.price *
                                                                    item.quantity
                                                                ).toFixed(
                                                                    2
                                                                )}
                                                            </p>
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>
                                    </div>

                                    {/* SHIPPING */}

                                    {shippingAddress && (
                                        <div className="border-t border-black/10 px-7 py-8 md:px-10">
                                            <p className="text-[8px] uppercase tracking-[3px] text-[#9b7a45]">
                                                DELIVERY
                                            </p>

                                            <h3 className="mt-2 font-['Cormorant_Garamond'] text-3xl font-medium">
                                                Shipping To
                                            </h3>

                                            <div className="mt-5 rounded-[20px] border border-black/10 bg-white/30 px-6 py-5">
                                                <p className="text-sm">
                                                    {
                                                        shippingAddress.fullName
                                                    }
                                                </p>

                                                <p className="mt-2 text-[9px] uppercase tracking-[1.5px] text-black/40">
                                                    {
                                                        shippingAddress.city
                                                    }
                                                    ,{' '}
                                                    {
                                                        shippingAddress.state
                                                    }{' '}
                                                    {
                                                        shippingAddress.postalCode
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* VIEW ORDER */}

                                    <div className="border-t border-black/10 px-7 py-7 md:px-10">
                                        <Link
                                            to={`/orders/${order._id}`}
                                            style={{
                                                color: '#ffffff',
                                                backgroundColor: '#000000',
                                            }}
                                            className="
            flex
            min-h-[52px]
            w-full
            items-center
            justify-center
            rounded-full
            border
            border-black
            px-6
            text-[9px]
            font-medium
            uppercase
            tracking-[2.5px]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[#9b7a45]
            hover:bg-[#9b7a45]
        "
                                        >
                                            <span
                                                style={{
                                                    color: '#ffffff',
                                                }}
                                            >
                                                View Order
                                            </span>

                                            <span
                                                style={{
                                                    color: '#ffffff',
                                                }}
                                                className="ml-5 text-base"
                                            >
                                                →
                                            </span>
                                        </Link>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </div>

                {/* ================= FOOTER NOTE ================= */}

                <div className="mx-auto mt-20 flex max-w-[1400px] flex-col justify-between gap-4 border-t border-black/10 pt-7 text-[8px] uppercase tracking-[2.5px] text-black/30 sm:flex-row">
                    <p>AURELIA / ORDERS</p>
                    <p>EST. 2026</p>
                </div>
            </section>
        </main>
    )
}

export default Orders
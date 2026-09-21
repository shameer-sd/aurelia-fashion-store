import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getProductImageUrl } from '../utils/productImages'

const statuses = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled',
]

function AdminOrders() {
  const { token } = useAuth()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  const fetchOrders = async () => {
    try {
      setError('')

      const response = await fetch(
        'http://localhost:5000/api/v1/orders/admin/all',
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

      setOrders(data.orders)
    } catch (error) {
      setError(
        error.message || 'Unable to load orders'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  const updateStatus = async (orderId, status) => {
    if (!token || updatingId) {
      return
    }

    setError('')
    setMessage('')
    setUpdatingId(orderId)

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/orders/admin/${orderId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to update order'
        )
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? {
              ...order,
              status: data.order.status,
            }
            : order
        )
      )

      setMessage(
        'Order status updated successfully.'
      )
    } catch (error) {
      setError(
        error.message || 'Unable to update order'
      )
    } finally {
      setUpdatingId(null)
    }
  }

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f3eadc] px-5 py-28 text-[#2c2925] md:px-10 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-5 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
            AURELIA / ADMIN
          </p>

          <h1 className="font-['Cormorant_Garamond'] text-[58px] font-medium leading-[0.88] tracking-[-2px] md:text-[100px]">
            MANAGE
            <br />
            ORDERS
          </h1>

          <div className="mt-14 rounded-[30px] border border-black/10 bg-white/35 px-7 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] backdrop-blur-xl">
            <p className="text-[9px] uppercase tracking-[3px] text-black/40">
              Loading orders...
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f3eadc] px-5 py-28 text-[#2c2925] md:px-10 md:py-36">

      <div className="mx-auto max-w-[1400px]">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col justify-between gap-10 border-b border-black/10 pb-14 md:flex-row md:items-end">

          <div>
            <p className="mb-5 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
              AURELIA / ADMIN
            </p>

            <h1 className="font-['Cormorant_Garamond'] text-[58px] font-medium leading-[0.88] tracking-[-2px] md:text-[100px]">
              MANAGE
              <br />
              ORDERS
            </h1>

            <p className="mt-7 max-w-[500px] text-[10px] uppercase leading-[2] tracking-[2px] text-black/40">
              Review customer orders, shipping details,
              and update order status.
            </p>
          </div>

          <Link
            to="/admin"
            className="
              inline-flex
              min-h-[48px]
              items-center
              justify-center
              rounded-full
              border
              border-black/15
              bg-white/30
              px-7
              text-[9px]
              font-medium
              uppercase
              tracking-[2px]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-[#9b7a45]
              hover:bg-white/60
            "
          >
            ← Back to Dashboard
          </Link>

        </div>

        {/* ================= MESSAGES ================= */}

        {error && (
          <div className="mt-8 rounded-[22px] border border-red-900/10 bg-red-900/[0.035] px-6 py-5">
            <p
              role="alert"
              className="text-[9px] uppercase leading-[2] tracking-[1.5px] text-red-900/70"
            >
              {error}
            </p>
          </div>
        )}

        {message && (
          <div className="mt-8 rounded-[22px] border border-[#9b7a45]/20 bg-[#9b7a45]/[0.06] px-6 py-5">
            <p className="text-[9px] uppercase leading-[2] tracking-[1.5px] text-[#806538]">
              {message}
            </p>
          </div>
        )}

        {/* ================= ORDER COUNT ================= */}

        <div className="mt-12 flex items-center justify-between border-b border-black/10 pb-5">
          <p className="text-[9px] font-medium uppercase tracking-[3px] text-black/40">
            Order Collection
          </p>

          <p className="font-['Cormorant_Garamond'] text-2xl">
            {orders.length}
            <span className="ml-2 text-[9px] font-sans uppercase tracking-[2px] text-black/35">
              Orders
            </span>
          </p>
        </div>

        {/* ================= EMPTY ================= */}

        {orders.length === 0 ? (
          <section className="mt-10 rounded-[30px] border border-black/10 bg-white/35 px-7 py-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.03)] backdrop-blur-xl">
            <p className="text-[9px] uppercase tracking-[3px] text-black/40">
              No orders found.
            </p>
          </section>
        ) : (

          /* ================= ORDERS ================= */

          <section className="mt-10 space-y-8">

            {orders.map((order) => (

              <article
                key={order._id}
                className="
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-black/10
                  bg-white/35
                  shadow-[0_25px_70px_rgba(0,0,0,0.035)]
                  backdrop-blur-xl
                "
              >

                {/* ================= ORDER HEADER ================= */}

                <div className="border-b border-black/10 px-6 py-7 md:px-9 md:py-8">

                  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">

                    <div>
                      <p className="mb-3 text-[8px] uppercase tracking-[3px] text-[#9b7a45]">
                        ORDER
                      </p>

                      <h2 className="max-w-[500px] break-all font-['Cormorant_Garamond'] text-2xl md:text-3xl">
                        #{order._id}
                      </h2>
                    </div>

                    <div className="md:text-right">
                      <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                        Total
                      </p>

                      <p className="mt-1 font-['Cormorant_Garamond'] text-3xl">
                        ₹{Number(order.totalAmount).toFixed(2)}
                      </p>
                    </div>

                  </div>

                  {/* META */}

                  <div className="mt-7 grid gap-5 border-t border-black/10 pt-6 sm:grid-cols-3">

                    <div>
                      <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                        Customer
                      </p>

                      <p className="mt-2 text-sm">
                        {order.user?.name ||
                          'Unknown customer'}
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                        Email
                      </p>

                      <p className="mt-2 break-all text-sm">
                        {order.user?.email ||
                          'Unknown email'}
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                        Date
                      </p>

                      <p className="mt-2 text-sm">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                  </div>

                </div>

                {/* ================= ORDER BODY ================= */}

                <div className="grid md:grid-cols-[1.2fr_0.8fr]">

                  {/* ITEMS */}

                  <div className="px-6 py-8 md:border-r md:border-black/10 md:px-9">

                    <p className="mb-6 text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                      Items
                    </p>

                    <div className="space-y-0">

                      {order.items.map(
                        (item, index) => {
                          const itemImage = getProductImageUrl(item)

                          return (
                            <div
                              key={index}
                              className="
                                flex
                                flex-col
                                justify-between
                                gap-4
                                border-b
                                border-black/10
                                py-5
                                first:pt-0
                                sm:flex-row
                                sm:items-center
                              "
                            >

                              <div className="flex items-center gap-4">
                                <div className="relative aspect-[4/5] h-14 w-11 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-[#e7ddcf]">
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
                                  <div className="absolute inset-0 -z-0 flex items-center justify-center font-['Cormorant_Garamond'] text-xs text-black/30">
                                    A
                                  </div>
                                </div>

                                <div>
                                  <h3 className="font-['Cormorant_Garamond'] text-xl">
                                    {item.name}
                                  </h3>

                                  <p className="mt-1 text-[9px] uppercase tracking-[1.5px] text-black/35">
                                    ₹{item.price} ×{' '}
                                    {item.quantity}
                                  </p>
                                </div>
                              </div>

                              <p className="font-['Cormorant_Garamond'] text-xl">
                                ₹
                                {(
                                  item.price *
                                  item.quantity
                                ).toFixed(2)}
                              </p>

                            </div>
                          )
                        }
                      )}

                    </div>

                  </div>

                  {/* SHIPPING */}

                  <div className="px-6 py-8 md:px-9">

                    <p className="mb-6 text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                      Shipping Address
                    </p>

                    {order.shippingAddress ? (
                      <div className="rounded-[22px] border border-black/10 bg-white/25 px-5 py-5">

                        <p className="text-sm font-medium">
                          {
                            order.shippingAddress
                              .fullName
                          }
                        </p>

                        <p className="mt-4 text-xs leading-6 text-black/55">
                          {
                            order.shippingAddress
                              .addressLine
                          }
                          <br />
                          {
                            order.shippingAddress
                              .city
                          }
                          ,{' '}
                          {
                            order.shippingAddress
                              .state
                          }{' '}
                          {
                            order.shippingAddress
                              .postalCode
                          }
                          <br />
                          {
                            order.shippingAddress
                              .country
                          }
                        </p>

                        <div className="mt-4 border-t border-black/10 pt-4">
                          <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                            Phone
                          </p>

                          <p className="mt-1 text-xs">
                            {
                              order.shippingAddress
                                .phone
                            }
                          </p>
                        </div>

                      </div>
                    ) : (
                      <p className="text-[9px] uppercase tracking-[2px] text-black/35">
                        No shipping address available.
                      </p>
                    )}

                  </div>

                </div>

                {/* ================= STATUS ================= */}

                <div className="border-t border-black/10 px-6 py-7 md:px-9">

                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    <div>
                      <p className="text-[8px] uppercase tracking-[3px] text-black/35">
                        Order Status
                      </p>

                      <p className="mt-2 font-['Cormorant_Garamond'] text-2xl capitalize">
                        {order.status}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                      <label
                        htmlFor={`status-${order._id}`}
                        className="text-[8px] uppercase tracking-[2px] text-black/40"
                      >
                        Update Status
                      </label>

                      <select
                        id={`status-${order._id}`}
                        value={order.status}
                        onChange={(event) =>
                          updateStatus(
                            order._id,
                            event.target.value
                          )
                        }
                        disabled={
                          updatingId === order._id
                        }
                        className="
                          min-h-[48px]
                          min-w-[180px]
                          rounded-full
                          border
                          border-black/10
                          bg-white/60
                          px-5
                          text-[9px]
                          uppercase
                          tracking-[2px]
                          outline-none
                          transition-all
                          duration-300
                          focus:border-[#9b7a45]
                          focus:bg-white
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        {statuses.map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          )
                        )}
                      </select>

                      {updatingId ===
                        order._id && (
                          <span className="text-[8px] uppercase tracking-[2px] text-[#9b7a45]">
                            Updating...
                          </span>
                        )}

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </section>
        )}

        {/* ================= FOOTER ================= */}

        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-black/10 pt-7 text-[8px] uppercase tracking-[2.5px] text-black/35 sm:flex-row">
          <span>AURELIA / ADMIN ORDERS</span>
          <span>EST. 2026</span>
        </div>

      </div>
    </main>
  )
}

export default AdminOrders
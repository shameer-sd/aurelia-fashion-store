import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getProductImageUrl } from '../utils/productImages'

function OrderDetails() {
  const { id } = useParams()
  const { token } = useAuth()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || 'Failed to load order'
          )
        }

        setOrder(data.order)
      } catch (error) {
        setError(
          error.message || 'Unable to load order'
        )
      } finally {
        setLoading(false)
      }
    }

    if (token && id) {
      fetchOrder()
    }
  }, [token, id])

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f3eadc] px-6 py-32 text-[#2c2925] md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-5 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
            AURELIA / ORDERS
          </p>

          <h1 className="font-['Cormorant_Garamond'] text-[60px] font-medium leading-[0.9] tracking-[-1.5px] md:text-[90px]">
            ORDER
            <br />
            DETAILS
          </h1>

          <div className="mt-12 rounded-[30px] border border-black/10 bg-white/35 px-7 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] backdrop-blur-xl">
            <p className="text-[9px] uppercase tracking-[2.5px] text-black/40">
              Loading order...
            </p>
          </div>
        </div>
      </main>
    )
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <main className="min-h-screen bg-[#f3eadc] px-6 py-32 text-[#2c2925] md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-5 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
            AURELIA / ORDERS
          </p>

          <h1 className="font-['Cormorant_Garamond'] text-[60px] font-medium leading-[0.9] tracking-[-1.5px] md:text-[90px]">
            ORDER
            <br />
            DETAILS
          </h1>

          <div className="mt-12 max-w-[650px] rounded-[30px] border border-red-900/10 bg-red-900/[0.035] px-7 py-10">
            <p
              role="alert"
              className="text-[9px] uppercase leading-[2] tracking-[1.5px] text-red-900/70"
            >
              {error}
            </p>

            <Link
              to="/orders"
              className="
                                mt-8
                                inline-flex
                                min-h-[50px]
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-black
                                bg-black
                                px-7
                                text-[9px]
                                font-medium
                                uppercase
                                tracking-[2px]
                                text-white
                                transition-all
                                duration-300
                                hover:border-[#9b7a45]
                                hover:bg-[#9b7a45]
                            "
            >
              ← Back to My Orders
            </Link>
          </div>
        </div>
      </main>
    )
  }

  /* ================= NOT FOUND ================= */

  if (!order) {
    return (
      <main className="min-h-screen bg-[#f3eadc] px-6 py-32 text-[#2c2925] md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-5 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
            AURELIA / ORDERS
          </p>

          <h1 className="font-['Cormorant_Garamond'] text-[60px] font-medium leading-[0.9] tracking-[-1.5px] md:text-[90px]">
            ORDER
            <br />
            DETAILS
          </h1>

          <div className="mt-12 max-w-[650px] rounded-[30px] border border-black/10 bg-white/35 px-7 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] backdrop-blur-xl">
            <p className="text-[9px] uppercase tracking-[2px] text-black/45">
              Order not found.
            </p>

            <Link
              to="/orders"
              className="
                                mt-8
                                inline-flex
                                min-h-[50px]
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-black
                                bg-black
                                px-7
                                text-[9px]
                                font-medium
                                uppercase
                                tracking-[2px]
                                text-white
                                transition-all
                                duration-300
                                hover:border-[#9b7a45]
                                hover:bg-[#9b7a45]
                            "
            >
              ← Back to My Orders
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const shippingAddress = order.shippingAddress

  return (
    <main className="min-h-screen bg-[#f3eadc] text-[#2c2925]">

      {/* ================= HEADER ================= */}

      <section className="border-b border-black/10 px-6 pb-14 pt-32 md:px-10">
        <div className="mx-auto max-w-[1400px]">

          <Link
            to="/orders"
            className="
                            mb-10
                            inline-flex
                            items-center
                            gap-3
                            text-[8px]
                            font-medium
                            uppercase
                            tracking-[2px]
                            text-black/45
                            transition-colors
                            duration-300
                            hover:text-[#9b7a45]
                        "
          >
            ← Back to My Orders
          </Link>

          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">

            <div>
              <p className="mb-5 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
                AURELIA / ORDER
              </p>

              <h1 className="font-['Cormorant_Garamond'] text-[65px] font-medium leading-[0.82] tracking-[-2px] md:text-[105px]">
                ORDER
                <br />
                DETAILS
              </h1>
            </div>

            <div className="md:text-right">
              <p className="text-[8px] uppercase leading-[2.2] tracking-[2.5px] text-black/35">
                ORDER
              </p>

              <p className="mt-1 max-w-[280px] break-all font-['Cormorant_Garamond'] text-xl">
                #{order._id}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ORDER CONTENT ================= */}

      <section className="px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">

          {/* ================= STATUS BAR ================= */}

          <div className="mb-12 grid gap-4 md:grid-cols-3">

            <div className="rounded-[24px] border border-black/10 bg-white/35 px-6 py-6 backdrop-blur-xl">
              <p className="text-[8px] uppercase tracking-[2.5px] text-black/35">
                Status
              </p>

              <p className="mt-3 font-['Cormorant_Garamond'] text-3xl font-medium capitalize">
                {order.status}
              </p>
            </div>

            <div className="rounded-[24px] border border-black/10 bg-white/35 px-6 py-6 backdrop-blur-xl">
              <p className="text-[8px] uppercase tracking-[2.5px] text-black/35">
                Date
              </p>

              <p className="mt-3 font-['Cormorant_Garamond'] text-3xl font-medium">
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            <div className="rounded-[24px] border border-black/10 bg-white/35 px-6 py-6 backdrop-blur-xl">
              <p className="text-[8px] uppercase tracking-[2.5px] text-black/35">
                Order Total
              </p>

              <p className="mt-3 font-['Cormorant_Garamond'] text-3xl font-medium">
                ₹{order.totalAmount}
              </p>
            </div>

          </div>

          {/* ================= MAIN GRID ================= */}

          <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start">

            {/* ================= ITEMS ================= */}

            <section>

              <div className="mb-7">
                <p className="mb-2 text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                  Order Contents
                </p>

                <h2 className="font-['Cormorant_Garamond'] text-4xl font-medium md:text-5xl">
                  Your Selection
                </h2>
              </div>

              <div className="overflow-hidden rounded-[30px] border border-black/10 bg-white/35 shadow-[0_20px_60px_rgba(0,0,0,0.03)] backdrop-blur-xl">

                {order.items.map(
                  (item, index) => {
                    const itemImage = getProductImageUrl(item)

                    return (
                      <article
                        key={index}
                        className="
                          border-b
                          border-black/10
                          p-6
                          last:border-b-0
                          md:p-8
                        "
                      >
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                          <div className="flex items-center gap-5">
                            <div className="relative aspect-[4/5] h-20 w-16 shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-[#e7ddcf]">
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
                              <div className="absolute inset-0 -z-0 flex items-center justify-center font-['Cormorant_Garamond'] text-base text-black/30">
                                A
                              </div>
                            </div>

                            <div>
                              <p className="mb-2 text-[8px] font-medium uppercase tracking-[2.5px] text-[#9b7a45]">
                                Item{' '}
                                {String(
                                  index +
                                  1
                                ).padStart(
                                  2,
                                  '0'
                                )}
                              </p>

                              <h3 className="font-['Cormorant_Garamond'] text-3xl font-medium md:text-4xl">
                                {
                                  item.name
                                }
                              </h3>

                              <div className="mt-4 flex flex-wrap gap-x-7 gap-y-2 text-[8px] uppercase tracking-[1.5px] text-black/40">
                                <span>
                                  Price ₹
                                  {
                                    item.price
                                  }
                                </span>

                                <span>
                                  Quantity{' '}
                                  {
                                    item.quantity
                                  }
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="sm:text-right">
                            <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                              Subtotal
                            </p>

                            <p className="mt-2 font-['Cormorant_Garamond'] text-3xl font-medium">
                              ₹
                              {(
                                item.price *
                                item.quantity
                              ).toFixed(
                                2
                              )}
                            </p>
                          </div>

                        </div>
                      </article>
                    )
                  }
                )}

              </div>

            </section>

            {/* ================= SHIPPING ================= */}

            <aside className="lg:sticky lg:top-28">

              {shippingAddress && (
                <section className="rounded-[30px] border border-black/10 bg-white/45 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-xl md:p-8">

                  <p className="text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                    Delivery
                  </p>

                  <h2 className="mt-3 font-['Cormorant_Garamond'] text-4xl font-medium">
                    Shipping Address
                  </h2>

                  <div className="my-7 h-px bg-black/10" />

                  <div className="space-y-4 text-[10px] leading-[1.8] text-black/55">

                    <div>
                      <p className="font-medium uppercase tracking-[1.5px] text-black/35">
                        Recipient
                      </p>

                      <p className="mt-1 text-[#2c2925]">
                        {
                          shippingAddress.fullName
                        }
                      </p>
                    </div>

                    <div>
                      <p className="font-medium uppercase tracking-[1.5px] text-black/35">
                        Address
                      </p>

                      <p className="mt-1">
                        {
                          shippingAddress.addressLine
                        }
                      </p>

                      <p>
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

                      <p>
                        {
                          shippingAddress.country
                        }
                      </p>
                    </div>

                    <div>
                      <p className="font-medium uppercase tracking-[1.5px] text-black/35">
                        Phone
                      </p>

                      <p className="mt-1">
                        {
                          shippingAddress.phone
                        }
                      </p>
                    </div>

                  </div>

                </section>
              )}

              {/* TOTAL */}

              <section className="mt-5 rounded-[30px] border border-black/10 bg-[#2c2925] p-7 text-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-8">

                <p className="text-[8px] font-medium uppercase tracking-[3px] text-[#c9ad7a]">
                  AURELIA / TOTAL
                </p>

                <div className="mt-5 flex items-end justify-between gap-5">
                  <p className="text-[8px] uppercase tracking-[2px] text-white/40">
                    Order Total
                  </p>

                  <p className="font-['Cormorant_Garamond'] text-4xl font-medium">
                    ₹
                    {Number(
                      order.totalAmount
                    ).toFixed(2)}
                  </p>
                </div>

              </section>

            </aside>
          </div>

          {/* ================= FOOTER ================= */}

          <div className="mt-16 flex flex-col justify-between gap-4 border-t border-black/10 pt-7 text-[8px] uppercase tracking-[2.5px] text-black/30 sm:flex-row">
            <p>AURELIA / ORDER DETAILS</p>
            <p>EST. 2026</p>
          </div>

        </div>
      </section>
    </main>
  )
}

export default OrderDetails
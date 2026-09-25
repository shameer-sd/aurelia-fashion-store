import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API_URL from '../utils/api'

function AdminDashboard() {
  const { token } = useAuth()

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`${API_URL}/api/v1/orders/admin/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || 'Failed to load statistics'
          )
        }

        setStats(data.stats)
      } catch (error) {
        setError(
          error.message ||
          'Unable to load dashboard statistics'
        )
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchStats()
    }
  }, [token])

  return (
    <main className="min-h-screen bg-[#f3eadc] text-[#171512]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="border-b border-black/10 px-6 pb-20 pt-32 md:px-10 md:pb-24">

        <div className="mx-auto max-w-[1400px]">

          <p className="mb-6 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
            AURELIA / ADMINISTRATION
          </p>

          <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">

            <div>

              <h1 className="font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.82] tracking-[-2px] sm:text-[80px] md:text-[100px] lg:text-[112px]">
                ADMIN
                <br />
                DASHBOARD
              </h1>

              <div className="mt-10 flex items-start gap-5">

                <span className="mt-2 h-px w-12 bg-black/30" />

                <p className="max-w-[420px] text-[9px] uppercase leading-[2] tracking-[2.5px] text-black/45">
                  Welcome to the AURELIA
                  <br />
                  administration panel.
                  <br />
                  <span className="text-[#9b7a45]">
                    Manage your store with intention.
                  </span>
                </p>

              </div>

            </div>

            <div className="lg:pb-2 lg:text-right">

              <p className="text-[9px] uppercase leading-[2] tracking-[3px] text-black/35">
                COLLECTION
                <br />
                ORDERS
                <br />
                STORE OPERATIONS
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="px-6 py-16 md:px-10 md:py-20">

        <div className="mx-auto max-w-[1400px]">

          {/* ERROR */}

          {error && (
            <div
              role="alert"
              className="mb-10 rounded-2xl border border-red-900/15 bg-red-900/[0.04] px-5 py-4 text-xs text-red-900"
            >
              {error}
            </div>
          )}


          {/* =================================================
              PERFORMANCE
          ================================================= */}

          <section>

            <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-5">

              <div>

                <p className="mb-2 text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                  Overview
                </p>

                <h2 className="font-['Cormorant_Garamond'] text-4xl font-medium md:text-5xl">
                  Store Performance
                </h2>

              </div>

              <p className="hidden text-[8px] uppercase tracking-[2px] text-black/35 sm:block">
                Live statistics
              </p>

            </div>


            {loading ? (

              <div className="rounded-[28px] border border-black/10 bg-white/35 p-16 text-center backdrop-blur-xl">

                <p className="font-['Cormorant_Garamond'] text-4xl">
                  Loading
                </p>

                <p className="mt-3 text-[8px] uppercase tracking-[2px] text-black/40">
                  Loading store statistics...
                </p>

              </div>

            ) : (

              <div className="grid gap-5 md:grid-cols-2">

                {/* =========================================
                    TOTAL ORDERS
                ========================================= */}

                <div className="group relative overflow-hidden rounded-[28px] border border-black/10 bg-[#faf6ef]/65 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-[#faf6ef]/85 md:p-10">

                  <div className="absolute right-8 top-8 flex items-center gap-2">

                    <span className="h-2 w-2 rounded-full bg-[#9b7a45]" />

                    <span className="text-[7px] uppercase tracking-[2px] text-black/30">
                      Live
                    </span>

                  </div>

                  <p className="text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                    Total Orders
                  </p>

                  <p className="mt-10 font-['Cormorant_Garamond'] text-[78px] font-medium leading-none tracking-[-3px] md:text-[96px]">
                    {String(stats.totalOrders).padStart(2, '0')}
                  </p>

                  <div className="mt-10 flex items-end justify-between border-t border-black/10 pt-5">

                    <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                      Orders received
                    </p>

                    <span className="text-[18px] text-[#9b7a45]">
                      ↗
                    </span>

                  </div>

                </div>


                {/* =========================================
                    TOTAL REVENUE
                ========================================= */}

                <div className="group relative overflow-hidden rounded-[28px] border border-black/10 bg-[#faf6ef]/65 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-[#faf6ef]/85 md:p-10">

                  <div className="absolute right-8 top-8 flex items-center gap-2">

                    <span className="h-2 w-2 rounded-full bg-[#9b7a45]" />

                    <span className="text-[7px] uppercase tracking-[2px] text-black/30">
                      Live
                    </span>

                  </div>

                  <p className="text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                    Total Revenue
                  </p>

                  <p className="mt-10 font-['Cormorant_Garamond'] text-[58px] font-medium leading-none tracking-[-2px] md:text-[76px]">
                    ₹{Number(stats.totalRevenue || 0).toFixed(2)}
                  </p>

                  <div className="mt-10 flex items-end justify-between border-t border-black/10 pt-5">

                    <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                      Revenue generated
                    </p>

                    <span className="text-[18px] text-[#9b7a45]">
                      ↗
                    </span>

                  </div>

                </div>

              </div>

            )}

          </section>


          {/* =================================================
              MANAGEMENT
          ================================================= */}

          <section className="mt-24">

            <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-5">

              <div>

                <p className="mb-2 text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                  Management
                </p>

                <h2 className="font-['Cormorant_Garamond'] text-4xl font-medium md:text-5xl">
                  Store Operations
                </h2>

              </div>

              <p className="hidden text-[8px] uppercase tracking-[2px] text-black/35 sm:block">
                AURELIA / 2026
              </p>

            </div>


            <div className="grid gap-5 md:grid-cols-2">

              {/* =========================================
                  PRODUCTS
              ========================================= */}

              <Link
                to="/admin/products"
                className="group relative overflow-hidden rounded-[28px] border border-black bg-[#11100f] p-8 text-white shadow-[0_25px_70px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 md:p-10"
              >

                <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full border border-white/[0.06]" />

                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-white/[0.05]" />


                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-[8px] font-medium uppercase tracking-[3px] text-[#c9ad7a]">
                      01 / Collection
                    </p>

                    {/* FIXED: WHITE TEXT */}

                    <h3 className="mt-8 font-['Cormorant_Garamond'] text-5xl font-medium leading-none text-white md:text-6xl">
                      Products
                    </h3>

                  </div>


                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-lg text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
                    ↗
                  </span>

                </div>


                <div className="mt-16 border-t border-white/10 pt-6">

                  {/* FIXED: BRIGHTER DESCRIPTION */}

                  <p className="max-w-[340px] text-[9px] uppercase leading-[2] tracking-[2px] text-white/65">
                    Create, edit and manage
                    <br />
                    the AURELIA product
                    <br />
                    collection.
                  </p>


                  <p className="mt-7 text-[9px] font-medium uppercase tracking-[2px] text-white transition-colors group-hover:text-[#c9ad7a]">
                    Manage Products
                    <span className="ml-4 text-base">
                      →
                    </span>
                  </p>

                </div>

              </Link>


              {/* =========================================
                  ORDERS
              ========================================= */}

              <Link
                to="/admin/orders"
                className="group relative overflow-hidden rounded-[28px] border border-black/10 bg-[#faf6ef]/65 p-8 shadow-[0_25px_70px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-[#faf6ef]/90 md:p-10"
              >

                <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full border border-black/[0.04]" />

                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-black/[0.04]" />


                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                      02 / Operations
                    </p>

                    <h3 className="mt-8 font-['Cormorant_Garamond'] text-5xl font-medium leading-none md:text-6xl">
                      Orders
                    </h3>

                  </div>


                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 text-lg transition-all duration-300 group-hover:bg-black group-hover:text-white">
                    ↗
                  </span>

                </div>


                <div className="mt-16 border-t border-black/10 pt-6">

                  <p className="max-w-[340px] text-[9px] uppercase leading-[2] tracking-[2px] text-black/40">
                    Review and manage
                    <br />
                    customer orders and
                    <br />
                    order activity.
                  </p>


                  <p className="mt-7 text-[9px] font-medium uppercase tracking-[2px] text-black transition-colors group-hover:text-[#9b7a45]">
                    Manage Orders
                    <span className="ml-4 text-base">
                      →
                    </span>
                  </p>

                </div>

              </Link>

            </div>

          </section>


          {/* =================================================
              QUICK ACCESS
          ================================================= */}

          <section className="mt-24">

            <div className="mb-8 border-b border-black/10 pb-5">

              <p className="mb-2 text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                Quick Access
              </p>

              <h2 className="font-['Cormorant_Garamond'] text-4xl font-medium md:text-5xl">
                Continue Managing
              </h2>

            </div>


            <div className="grid gap-3 sm:grid-cols-3">

              {/* STORE */}

              <Link
                to="/"
                className="group flex items-center justify-between rounded-2xl border border-black/10 bg-white/25 px-6 py-5 transition-all duration-300 hover:bg-black hover:text-white"
              >

                <div>

                  <p className="text-[8px] uppercase tracking-[2px] text-black/35 group-hover:text-white/45">
                    Store
                  </p>

                  <p className="mt-2 font-['Cormorant_Garamond'] text-2xl">
                    View Store
                  </p>

                </div>

                <span className="text-lg">
                  ↗
                </span>

              </Link>


              {/* PRODUCTS */}

              <Link
                to="/admin/products"
                className="group flex items-center justify-between rounded-2xl border border-black/10 bg-white/25 px-6 py-5 transition-all duration-300 hover:bg-black hover:text-white"
              >

                <div>

                  <p className="text-[8px] uppercase tracking-[2px] text-black/35 group-hover:text-white/45">
                    Collection
                  </p>

                  <p className="mt-2 font-['Cormorant_Garamond'] text-2xl">
                    Products
                  </p>

                </div>

                <span className="text-lg">
                  ↗
                </span>

              </Link>


              {/* ORDERS */}

              <Link
                to="/admin/orders"
                className="group flex items-center justify-between rounded-2xl border border-black/10 bg-white/25 px-6 py-5 transition-all duration-300 hover:bg-black hover:text-white"
              >

                <div>

                  <p className="text-[8px] uppercase tracking-[2px] text-black/35 group-hover:text-white/45">
                    Operations
                  </p>

                  <p className="mt-2 font-['Cormorant_Garamond'] text-2xl">
                    Orders
                  </p>

                </div>

                <span className="text-lg">
                  ↗
                </span>

              </Link>

            </div>

          </section>


          {/* =================================================
              FOOTER NOTE
          ================================================= */}

          <section className="mt-24 border-t border-black/10 pt-8">

            <div className="flex flex-col justify-between gap-4 text-[8px] uppercase tracking-[2.5px] text-black/30 sm:flex-row">

              <p>
                AURELIA / ADMINISTRATION
              </p>

              <p>
                EST. 2026
              </p>

            </div>

          </section>

        </div>

      </section>

    </main>
  )
}

export default AdminDashboard
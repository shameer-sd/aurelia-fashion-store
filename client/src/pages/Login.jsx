import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const redirectPath = location.state?.from || '/'

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:5000/api/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed')
        return
      }

      login(data.user, data.token)

      navigate(redirectPath)
    } catch (error) {
      setError('Unable to connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f3eadc] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-black/10 bg-white/30 shadow-[0_30px_80px_rgba(45,38,30,0.12)] backdrop-blur-xl md:grid-cols-2">

          {/* LEFT — EDITORIAL SIDE */}
          <section className="relative hidden min-h-[650px] overflow-hidden bg-[#171513] md:block">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{
                backgroundImage: "url('/images/womens-collection.jpg')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-between p-10 lg:p-14">
              <div>
                <p className="text-[9px] uppercase tracking-[4px] text-[#c9ad7a]">
                  AURELIA
                </p>

                <div className="mt-8 h-px w-12 bg-[#c9ad7a]/70" />
              </div>

              <div>
                <p className="mb-4 text-[9px] uppercase tracking-[3px] text-white/60">
                  The House of AURELIA
                </p>

                <h2 className="max-w-sm font-serif text-5xl leading-[0.95] text-[#f8f4ec] lg:text-6xl">
                  Elegance
                  <br />
                  begins here.
                </h2>

                <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">
                  Discover considered pieces designed for modern
                  sophistication.
                </p>
              </div>
            </div>
          </section>

          {/* RIGHT — LOGIN FORM */}
          <section className="flex min-h-[650px] items-center justify-center bg-[#f8f4ec]/80 px-7 py-12 sm:px-12 lg:px-16">
            <div className="w-full max-w-md">

              {/* BRAND */}
              <div className="mb-12 text-center md:text-left">
                <p className="text-[10px] uppercase tracking-[4px] text-[#9b7a45]">
                  AURELIA
                </p>

                <h1 className="mt-4 font-serif text-5xl leading-none text-[#2c2925] sm:text-6xl">
                  Welcome back.
                </h1>

                <p className="mt-5 text-sm leading-6 text-[#2c2925]/55">
                  Sign in to continue your AURELIA experience.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-7">

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-3 block text-[9px] font-semibold uppercase tracking-[2.5px] text-[#2c2925]/55"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full border-0 border-b border-[#2c2925]/20 bg-transparent px-0 py-3 text-sm text-[#2c2925] outline-none transition-all placeholder:text-[#2c2925]/30 focus:border-[#9b7a45] focus:ring-0"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-3 block text-[9px] font-semibold uppercase tracking-[2.5px] text-[#2c2925]/55"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full border-0 border-b border-[#2c2925]/20 bg-transparent px-0 py-3 text-sm text-[#2c2925] outline-none transition-all placeholder:text-[#2c2925]/30 focus:border-[#9b7a45] focus:ring-0"
                  />
                </div>

                {/* ERROR */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-900/10 bg-red-900/[0.04] px-4 py-3 text-xs leading-5 text-red-800"
                  >
                    {error}
                  </div>
                )}

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-3 w-full overflow-hidden rounded-full bg-[#2c2925] px-6 py-4 text-[10px] font-semibold uppercase tracking-[3px] text-[#f8f4ec] transition-all duration-300 hover:bg-[#171513] hover:shadow-[0_12px_30px_rgba(44,41,37,0.18)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="relative z-10">
                    {loading ? 'Logging in...' : 'Login'}
                  </span>
                </button>
              </form>

              {/* SIGNUP */}
              <div className="mt-10 border-t border-[#2c2925]/10 pt-7 text-center">
                <p className="text-xs text-[#2c2925]/50">
                  Don't have an account?
                </p>

                <Link
                  to="/signup"
                  className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-[2px] text-[#9b7a45] transition-colors hover:text-[#2c2925]"
                >
                  Create Account
                </Link>
              </div>

              {/* BACK TO SHOP */}
              <div className="mt-8 text-center">
                <Link
                  to="/shop"
                  className="text-[9px] uppercase tracking-[2px] text-[#2c2925]/40 transition-colors hover:text-[#9b7a45]"
                >
                  ← Continue Shopping
                </Link>
              </div>

            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Login
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:5000/api/v1/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Signup failed')
        return
      }

      setSuccess('Account created successfully!')

      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (error) {
      setError('Unable to connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f3eadc] text-[#2c2925]">

      {/* ================= HEADER ================= */}
      <section className="border-b border-black/10 px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1400px] items-end justify-between">

          <div>
            <p className="mb-3 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
              AURELIA / ACCOUNT
            </p>

            <h1 className="font-serif text-5xl leading-none tracking-[-1.5px] sm:text-6xl lg:text-7xl">
              Create Account
            </h1>
          </div>

          <p className="hidden pb-1 text-right text-[9px] uppercase tracking-[3px] text-black/40 sm:block">
            AURELIA
            <br />
            EST. 2026
          </p>

        </div>
      </section>

      {/* ================= SIGNUP AREA ================= */}
      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">

        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[1fr_430px] lg:items-center">

          {/* LEFT EDITORIAL CONTENT */}
          <div className="hidden lg:block">

            <p className="mb-6 text-[10px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
              JOIN AURELIA
            </p>

            <h2 className="max-w-[620px] font-serif text-6xl leading-[0.95] tracking-[-2px] xl:text-7xl">
              Begin your
              <br />
              <span className="italic">journey.</span>
            </h2>

            <div className="mt-10 flex items-start gap-5">

              <span className="mt-2 block h-px w-12 bg-black/30" />

              <p className="max-w-[330px] text-[10px] leading-6 uppercase tracking-[2px] text-black/45">
                Create your AURELIA account
                <br />
                and discover timeless fashion,
                <br />
                refined details and modern
                <br />
                silhouettes.
              </p>

            </div>

          </div>

          {/* FORM PANEL */}
          <div className="rounded-[32px] border border-black/10 bg-white/35 p-7 shadow-[0_25px_80px_rgba(60,45,30,0.08)] backdrop-blur-xl sm:p-10">

            <div className="mb-8">

              <p className="mb-3 text-[9px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                ACCOUNT DETAILS
              </p>

              <h2 className="font-serif text-4xl tracking-[-1px]">
                Welcome to AURELIA
              </h2>

              <p className="mt-3 text-[11px] leading-5 text-black/45">
                Create your account to continue.
              </p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NAME */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[9px] font-medium uppercase tracking-[2.5px] text-black/45"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                  placeholder="Your name"
                  className="h-[54px] w-full rounded-full border border-black/10 bg-white/45 px-5 text-sm text-[#2c2925] outline-none transition-all placeholder:text-black/25 focus:border-[#9b7a45] focus:bg-white/70"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[9px] font-medium uppercase tracking-[2.5px] text-black/45"
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
                  placeholder="you@example.com"
                  className="h-[54px] w-full rounded-full border border-black/10 bg-white/45 px-5 text-sm text-[#2c2925] outline-none transition-all placeholder:text-black/25 focus:border-[#9b7a45] focus:bg-white/70"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-[9px] font-medium uppercase tracking-[2.5px] text-black/45"
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
                  minLength="6"
                  required
                  placeholder="Minimum 6 characters"
                  className="h-[54px] w-full rounded-full border border-black/10 bg-white/45 px-5 text-sm text-[#2c2925] outline-none transition-all placeholder:text-black/25 focus:border-[#9b7a45] focus:bg-white/70"
                />

                <p className="mt-2 px-4 text-[9px] uppercase tracking-[1.5px] text-black/30">
                  Minimum 6 characters
                </p>
              </div>

              {/* ERROR */}
              {error && (
                <div
                  role="alert"
                  className="rounded-2xl border border-red-900/10 bg-red-50/60 px-4 py-3 text-[10px] uppercase tracking-[1.5px] text-red-800"
                >
                  {error}
                </div>
              )}

              {/* SUCCESS */}
              {success && (
                <div
                  className="rounded-2xl border border-[#9b7a45]/20 bg-[#9b7a45]/10 px-4 py-3 text-[10px] uppercase tracking-[1.5px] text-[#806331]"
                >
                  {success}
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="group flex min-h-[56px] w-full items-center justify-center rounded-full border border-black bg-black px-6 text-[10px] font-medium uppercase tracking-[3px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9b7a45] hover:bg-[#9b7a45] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? 'Creating Account...'
                  : 'Create Account'}

                {!loading && (
                  <span className="ml-4 text-base transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>

            </form>

            {/* LOGIN LINK */}
            <div className="mt-8 border-t border-black/10 pt-7 text-center">

              <p className="text-[10px] uppercase tracking-[1.5px] text-black/40">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="mt-3 inline-flex items-center text-[10px] font-medium uppercase tracking-[2.5px] text-[#2c2925] transition-colors duration-300 hover:text-[#9b7a45]"
              >
                Login
                <span className="ml-2">→</span>
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <section className="border-t border-black/10 px-6 py-8 sm:px-10 lg:px-16">

        <div className="mx-auto flex max-w-[1400px] items-center justify-between">

          <p className="text-[9px] uppercase tracking-[3px] text-black/35">
            AURELIA / ACCOUNT
          </p>

          <Link
            to="/shop"
            className="text-[9px] uppercase tracking-[2.5px] text-black/45 transition-colors hover:text-[#9b7a45]"
          >
            Continue Shopping →
          </Link>

        </div>

      </section>

    </main>
  )
}

export default Signup
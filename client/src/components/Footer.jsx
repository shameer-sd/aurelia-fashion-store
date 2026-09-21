import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext'

function Footer() {
    const [email, setEmail] = useState('')
    const { addToast } = useToast()

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (!email) return
        addToast({
            title: 'Welcome to Atelier Aurelia',
            message: 'You have been added to the private VIP preview circle.',
            type: 'gold',
        })
        setEmail('')
    }

    return (
        <footer className="border-t border-white/10 bg-[#0d0c0b] text-[#f5f1e8]">
            {/* Newsletter & Atelier VIP Strip */}
            <div className="border-b border-white/10 bg-[#141210]">
                <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
                    <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
                        <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[3px] text-[#c9ad7a]">
                                Exclusive Access
                            </p>
                            <h3 className="mt-2 font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-medium text-white">
                                Join the House of AURELIA
                            </h3>
                            <p className="mt-1 text-xs text-white/50 font-light">
                                Receive invitations to private salon viewings, capsule previews, and seasonal releases.
                            </p>
                        </div>

                        <form onSubmit={handleSubscribe} className="flex w-full max-w-md items-center gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address..."
                                required
                                className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-xs text-white outline-none placeholder:text-white/30 focus:border-[#c9ad7a] focus:bg-white/10 transition-all"
                            />
                            <button
                                type="submit"
                                className="shrink-0 rounded-full bg-[#c9ad7a] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[2px] text-[#111] hover:bg-[#dfc89f] transition-all shadow-[0_4px_20px_rgba(201,173,122,0.2)]"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Links */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-block">
                            <h2 className="font-serif text-3xl tracking-[0.25em] text-white">
                                AURELIA
                            </h2>
                        </Link>

                        <p className="mt-4 max-w-xs text-xs leading-relaxed text-[#b9b3a8] font-light">
                            Timeless silhouettes, considered fabrics, and modern luxury
                            sculpted with intention for those who appreciate understated elegance.
                        </p>

                        <div className="mt-6 flex items-center gap-4 text-xs tracking-[1px] text-[#c9ad7a]">
                            <span>PARIS</span>
                            <span>·</span>
                            <span>MILAN</span>
                            <span>·</span>
                            <span>MUMBAI</span>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d8c7a4]">
                            Collections
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-xs font-light">
                            <Link to="/shop?gender=Women" className="text-[#b9b3a8] transition hover:text-white">
                                Women's Haute Edition
                            </Link>
                            <Link to="/shop?gender=Men" className="text-[#b9b3a8] transition hover:text-white">
                                Men's Tailoring
                            </Link>
                            <Link to="/shop?category=Shoes" className="text-[#b9b3a8] transition hover:text-white">
                                Handcrafted Shoes
                            </Link>
                            <Link to="/shop?category=Accessories" className="text-[#b9b3a8] transition hover:text-white">
                                Leather Goods & Accessories
                            </Link>
                            <Link to="/shop?category=Perfume" className="text-[#b9b3a8] transition hover:text-white">
                                Master Perfumery & Scents
                            </Link>
                            <Link to="/shop" className="text-[#c9ad7a] transition hover:underline">
                                Explore New Arrivals
                            </Link>
                        </div>
                    </div>

                    {/* Information */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d8c7a4]">
                            Atelier & House
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-xs font-light">
                            <Link to="/about" className="text-[#b9b3a8] transition hover:text-white">
                                Our Story & Philosophy
                            </Link>
                            <Link to="/about" className="text-[#b9b3a8] transition hover:text-white">
                                Sustainable Craftsmanship
                            </Link>
                            <Link to="/contact" className="text-[#b9b3a8] transition hover:text-white">
                                Concierge Contact
                            </Link>
                            <Link to="/shipping" className="text-[#b9b3a8] transition hover:text-white">
                                Complimentary Shipping & Returns
                            </Link>
                        </div>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d8c7a4]">
                            Client Services
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-xs font-light">
                            <Link to="/orders" className="text-[#b9b3a8] transition hover:text-white">
                                Order Tracking & History
                            </Link>
                            <Link to="/cart" className="text-[#b9b3a8] transition hover:text-white">
                                Shopping Bag
                            </Link>
                            <Link to="/privacy" className="text-[#b9b3a8] transition hover:text-white">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-[#b9b3a8] transition hover:text-white">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 bg-[#080807]">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-[10px] text-[#8f897f] uppercase tracking-[1.5px] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
                    <p>© {new Date().getFullYear()} AURELIA ATELIER. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span>Complimentary Global Courier</span>
                        <span>·</span>
                        <span>100% Authentic Luxury</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
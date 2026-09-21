import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import SearchModal from './SearchModal'
import WishlistDrawer from './WishlistDrawer'

export default function Navbar() {
    const { user, logout, isLoggedIn } = useAuth()
    const { cartCount } = useCart()
    const { wishlistCount, setIsWishlistOpen } = useWishlist()
    const location = useLocation()

    const [menuOpen, setMenuOpen] = useState(false)
    const [accountOpen, setAccountOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Detect scroll for dynamic glassmorphic navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Global keyboard shortcut '/' for search
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault()
                setSearchOpen(true)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const closeMenu = () => {
        setMenuOpen(false)
    }

    const handleLogout = () => {
        logout()
        setAccountOpen(false)
        closeMenu()
    }

    const searchParams = new URLSearchParams(location.search)
    const gender = searchParams.get('gender')

    // Determine navbar color theme based on page and scroll
    const isDarkHeroPage =
        location.pathname === '/' ||
        (location.pathname === '/shop' && gender === 'Women')

    // Text & icon color calculation
    const navTextColor = scrolled
        ? '#f8f4ec'
        : isDarkHeroPage
            ? '#f8f4ec'
            : '#2c2925'

    const navBgClass = scrolled
        ? 'bg-[#0b0b0b]/85 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl py-3'
        : 'bg-transparent py-5'

    return (
        <>
            <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${navBgClass}`}>
                {/* Main Navbar Bar */}
                <div className="mx-auto flex w-full max-w-[1700px] items-center justify-between px-6 sm:px-10 lg:px-14">
                    {/* Left: Mobile Menu Trigger / Brand Logo */}
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            style={{ color: navTextColor }}
                            className="flex shrink-0 xl:hidden p-1 hover:opacity-75 transition-opacity"
                        >
                            {menuOpen ? (
                                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <line x1="3" y1="7" x2="21" y2="7" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="17" x2="21" y2="17" />
                                </svg>
                            )}
                        </button>

                        <Link
                            to="/"
                            onClick={() => {
                                closeMenu()
                                setAccountOpen(false)
                            }}
                            style={{ color: navTextColor }}
                            className="font-serif text-[26px] sm:text-[30px] font-semibold tracking-[0.3em] transition-all duration-300 hover:opacity-80"
                        >
                            AURELIA
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden items-center gap-7 2xl:gap-10 xl:flex">
                        <Link
                            to="/shop?gender=Women"
                            style={{ color: navTextColor }}
                            className="text-[13px] font-medium uppercase tracking-[2px] transition-all hover:text-[#c9ad7a] hover:opacity-90"
                        >
                            Women
                        </Link>

                        <Link
                            to="/shop?gender=Men"
                            style={{ color: navTextColor }}
                            className="text-[13px] font-medium uppercase tracking-[2px] transition-all hover:text-[#c9ad7a] hover:opacity-90"
                        >
                            Men
                        </Link>

                        <Link
                            to="/shop?category=Shoes"
                            style={{ color: navTextColor }}
                            className="text-[13px] font-medium uppercase tracking-[2px] transition-all hover:text-[#c9ad7a] hover:opacity-90"
                        >
                            Shoes
                        </Link>

                        <Link
                            to="/shop?category=Accessories"
                            style={{ color: navTextColor }}
                            className="text-[13px] font-medium uppercase tracking-[2px] transition-all hover:text-[#c9ad7a] hover:opacity-90"
                        >
                            Accessories
                        </Link>

                        <Link
                            to="/shop?category=Perfume"
                            style={{ color: navTextColor }}
                            className="text-[13px] font-medium uppercase tracking-[2px] transition-all hover:text-[#c9ad7a] hover:opacity-90"
                        >
                            Perfume
                        </Link>

                        <Link
                            to="/shop"
                            style={{ color: navTextColor }}
                            className="text-[13px] font-medium uppercase tracking-[2px] text-[#c9ad7a] transition-all hover:underline"
                        >
                            New Arrivals
                        </Link>
                    </nav>

                    {/* Right Action Icons */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        {/* Search Button */}
                        <button
                            type="button"
                            aria-label="Search catalog"
                            onClick={() => setSearchOpen(true)}
                            style={{ color: navTextColor }}
                            className="flex items-center gap-2 text-xs uppercase tracking-[1.5px] transition-transform duration-300 hover:scale-110 p-1"
                            title="Search (Press /)"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="7" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
                            </svg>
                            <span className="hidden xl:inline text-[10px] text-white/50 bg-white/10 px-2 py-0.5 rounded-full">
                                /
                            </span>
                        </button>

                        {/* Wishlist Button */}
                        <button
                            type="button"
                            aria-label="Wishlist"
                            onClick={() => setIsWishlistOpen(true)}
                            style={{ color: navTextColor }}
                            className="relative transition-transform duration-300 hover:scale-110 p-1"
                            title="Saved Pieces"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            {wishlistCount > 0 && (
                                <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c9ad7a] px-1 text-[9px] font-bold text-[#111] shadow-sm animate-pulse-gold">
                                    {wishlistCount}
                                </span>
                            )}
                        </button>

                        {/* Account Menu */}
                        <div className="relative">
                            <button
                                type="button"
                                aria-label="Account"
                                onClick={() => setAccountOpen(!accountOpen)}
                                style={{ color: navTextColor }}
                                className="transition-transform duration-300 hover:scale-110 p-1"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="7" r="4" />
                                    <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
                                </svg>
                            </button>

                            {/* Account Dropdown */}
                            {accountOpen && (
                                <div className="absolute right-0 top-10 w-60 overflow-hidden rounded-2xl border border-white/10 bg-[#121110] p-2 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl z-50">
                                    <div className="border-b border-white/10 px-4 py-3">
                                        <p className="text-[8px] font-semibold uppercase tracking-[2px] text-[#c9ad7a]">
                                            Member Atelier
                                        </p>
                                        <p className="mt-1 truncate text-sm font-medium">
                                            {isLoggedIn && user?.name ? user.name : 'Welcome Guest'}
                                        </p>
                                    </div>

                                    <div className="py-2 text-xs font-light">
                                        {isLoggedIn ? (
                                            <>
                                                <Link
                                                    to="/orders"
                                                    onClick={() => setAccountOpen(false)}
                                                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 hover:bg-white/10 hover:text-[#c9ad7a] transition-all"
                                                >
                                                    <span>My Orders & Delivery</span>
                                                </Link>

                                                {user?.role === 'admin' && (
                                                    <Link
                                                        to="/admin"
                                                        onClick={() => setAccountOpen(false)}
                                                        className="flex items-center justify-between rounded-xl px-4 py-2.5 text-[#dfc89f] hover:bg-white/10 transition-all"
                                                    >
                                                        <span>Admin Dashboard</span>
                                                        <span className="rounded bg-[#c9ad7a]/20 px-1.5 py-0.5 text-[8px] uppercase tracking-[1px] text-[#c9ad7a]">
                                                            Admin
                                                        </span>
                                                    </Link>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={handleLogout}
                                                    className="w-full text-left rounded-xl px-4 py-2.5 text-red-400 hover:bg-white/10 transition-all"
                                                >
                                                    Sign Out
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    to="/login"
                                                    onClick={() => setAccountOpen(false)}
                                                    className="block rounded-xl px-4 py-2.5 hover:bg-white/10 hover:text-[#c9ad7a] transition-all"
                                                >
                                                    Sign In
                                                </Link>
                                                <Link
                                                    to="/signup"
                                                    onClick={() => setAccountOpen(false)}
                                                    className="block rounded-xl px-4 py-2.5 hover:bg-white/10 hover:text-[#c9ad7a] transition-all"
                                                >
                                                    Create VIP Account
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Shopping Bag Icon */}
                        <Link
                            to="/cart"
                            aria-label="Shopping bag"
                            style={{ color: navTextColor }}
                            className="relative flex items-center justify-center transition-transform duration-300 hover:scale-110 p-1"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M6 8H18L19 21H5L6 8Z" />
                                <path d="M9 8V6C9 4.3 10.3 3 12 3C13.7 3 15 4.3 15 6V8" />
                            </svg>

                            {cartCount > 0 && (
                                <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c9ad7a] px-1 text-[9px] font-bold text-[#111] shadow-md">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Slide Menu */}
                <div
                    className={`overflow-hidden bg-[#0b0b0b]/95 border-b border-white/10 backdrop-blur-2xl transition-all duration-500 xl:hidden ${
                        menuOpen ? 'max-h-[750px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
                    }`}
                >
                    <nav className="flex flex-col px-8 space-y-4">
                        <Link
                            to="/shop?gender=Women"
                            onClick={closeMenu}
                            className="text-sm font-medium uppercase tracking-[2px] text-white hover:text-[#c9ad7a] transition-colors py-2 border-b border-white/5"
                        >
                            Women
                        </Link>
                        <Link
                            to="/shop?gender=Men"
                            onClick={closeMenu}
                            className="text-sm font-medium uppercase tracking-[2px] text-white hover:text-[#c9ad7a] transition-colors py-2 border-b border-white/5"
                        >
                            Men
                        </Link>
                        <Link
                            to="/shop?category=Shoes"
                            onClick={closeMenu}
                            className="text-sm font-medium uppercase tracking-[2px] text-white hover:text-[#c9ad7a] transition-colors py-2 border-b border-white/5"
                        >
                            Shoes
                        </Link>
                        <Link
                            to="/shop?category=Accessories"
                            onClick={closeMenu}
                            className="text-sm font-medium uppercase tracking-[2px] text-white hover:text-[#c9ad7a] transition-colors py-2 border-b border-white/5"
                        >
                            Accessories
                        </Link>
                        <Link
                            to="/shop?category=Perfume"
                            onClick={closeMenu}
                            className="text-sm font-medium uppercase tracking-[2px] text-white hover:text-[#c9ad7a] transition-colors py-2 border-b border-white/5"
                        >
                            Perfume
                        </Link>
                        <Link
                            to="/shop"
                            onClick={closeMenu}
                            className="text-sm font-medium uppercase tracking-[2px] text-[#c9ad7a] py-2 border-b border-white/5"
                        >
                            New Arrivals
                        </Link>

                        <div className="pt-4 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => {
                                    closeMenu()
                                    setIsWishlistOpen(true)
                                }}
                                className="text-xs uppercase tracking-[2px] text-white/70 hover:text-[#c9ad7a]"
                            >
                                Saved Pieces ({wishlistCount})
                            </button>
                            <Link
                                to="/cart"
                                onClick={closeMenu}
                                className="text-xs uppercase tracking-[2px] text-[#c9ad7a] font-semibold"
                            >
                                Bag ({cartCount})
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Live Search Modal */}
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

            {/* Slide-over Wishlist Drawer */}
            <WishlistDrawer />
        </>
    )
}
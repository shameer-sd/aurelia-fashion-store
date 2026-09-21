import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
    const [wishlistItems, setWishlistItems] = useState(() => {
        try {
            const saved = localStorage.getItem('aurelia-wishlist')
            return saved ? JSON.parse(saved) : []
        } catch {
            return []
        }
    })

    const [isWishlistOpen, setIsWishlistOpen] = useState(false)

    useEffect(() => {
        try {
            localStorage.setItem('aurelia-wishlist', JSON.stringify(wishlistItems))
        } catch (e) {
            console.error('Failed to save wishlist', e)
        }
    }, [wishlistItems])

    const getProductId = (product) => {
        return product._id || product.id
    }

    const isInWishlist = (productId) => {
        return wishlistItems.some((item) => getProductId(item) === productId)
    }

    const addToWishlist = (product) => {
        const id = getProductId(product)
        if (!isInWishlist(id)) {
            setWishlistItems((prev) => [...prev, product])
        }
    }

    const removeFromWishlist = (productId) => {
        setWishlistItems((prev) => prev.filter((item) => getProductId(item) !== productId))
    }

    const toggleWishlist = (product) => {
        const id = getProductId(product)
        if (isInWishlist(id)) {
            removeFromWishlist(id)
            return false
        } else {
            addToWishlist(product)
            return true
        }
    }

    const clearWishlist = () => {
        setWishlistItems([])
    }

    const wishlistCount = wishlistItems.length

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                isInWishlist,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                clearWishlist,
                wishlistCount,
                isWishlistOpen,
                setIsWishlistOpen,
            }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    return useContext(WishlistContext)
}

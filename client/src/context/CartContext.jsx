import {
    createContext,
    useContext,
    useState,
    useEffect,
} from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('aurelia-cart')

        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(() => {
        localStorage.setItem(
            'aurelia-cart',
            JSON.stringify(cartItems)
        )
    }, [cartItems])

    const getProductId = (product) => {
        return product._id || product.id
    }

    const getCartQuantity = (productId) => {
        const item = cartItems.find(
            (item) => getProductId(item) === productId
        )

        return item ? item.quantity : 0
    }

    const addToCart = (product) => {
        setCartItems((currentItems) => {
            const productId = getProductId(product)

            const existingItem = currentItems.find(
                (item) =>
                    getProductId(item) === productId
            )

            if (existingItem) {
                if (
                    existingItem.quantity >=
                    product.stock
                ) {
                    return currentItems
                }

                return currentItems.map((item) =>
                    getProductId(item) === productId
                        ? {
                            ...item,
                            ...product,
                            quantity: item.quantity + 1,
                        }
                        : item
                )
            }

            if (product.stock <= 0) {
                return currentItems
            }

            return [
                ...currentItems,
                {
                    ...product,
                    quantity: 1,
                },
            ]
        })
    }

    const removeFromCart = (productId) => {
        setCartItems((currentItems) =>
            currentItems.filter(
                (item) =>
                    getProductId(item) !== productId
            )
        )
    }

    const increaseQuantity = (productId) => {
        setCartItems((currentItems) =>
            currentItems.map((item) => {
                if (
                    getProductId(item) !== productId
                ) {
                    return item
                }

                if (item.quantity >= item.stock) {
                    return item
                }

                return {
                    ...item,
                    quantity: item.quantity + 1,
                }
            })
        )
    }

    const decreaseQuantity = (productId) => {
        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    getProductId(item) === productId
                        ? {
                            ...item,
                            quantity:
                                item.quantity - 1,
                        }
                        : item
                )
                .filter(
                    (item) => item.quantity > 0
                )
        )
    }

    const clearCart = () => {
        setCartItems([])
    }

    const cartCount = cartItems.reduce(
        (total, item) =>
            total + item.quantity,
        0
    )

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                cartCount,
                getCartQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
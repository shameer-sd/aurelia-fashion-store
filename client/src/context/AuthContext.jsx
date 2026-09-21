import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('aurelia-user')

        return savedUser ? JSON.parse(savedUser) : null
    })

    const [token, setToken] = useState(() => {
        return localStorage.getItem('aurelia-token') || null
    })

    const login = (userData, userToken) => {
        setUser(userData)
        setToken(userToken)

        localStorage.setItem('aurelia-user', JSON.stringify(userData))
        localStorage.setItem('aurelia-token', userToken)
    }

    const logout = () => {
        setUser(null)
        setToken(null)

        localStorage.removeItem('aurelia-user')
        localStorage.removeItem('aurelia-token')
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isLoggedIn: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
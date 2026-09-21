import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Shipping from './pages/Shipping'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails'

import Navbar from './components/common/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/common/ProtectedRoute'
import AdminRoute from './components/common/AdminRoute'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import AdminOrders from './pages/AdminOrders'

import { WishlistProvider } from './context/WishlistContext'
import { ToastProvider } from './context/ToastContext'

function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/shop"
            element={<Shop />}
          />

          <Route
            path="/shop/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/privacy"
            element={<Privacy />}
          />
          <Route
            path="/terms"
            element={<Terms />}
          />

          <Route
            path="/shipping"
            element={<Shipping />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

            <Route
              path="/orders/:id"
              element={<OrderDetails />}
            />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin/products"
              element={<AdminProducts />}
            />

            <Route
              path="/admin/orders"
              element={<AdminOrders />}
            />
          </Route>

        </Routes>

        <Footer />
      </WishlistProvider>
    </ToastProvider>
  )
}

export default App
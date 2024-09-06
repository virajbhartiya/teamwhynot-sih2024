import { Route, Routes } from 'react-router-dom'
import Chat from '@/pages/Seller/Chat'
import { Login } from '@/pages/Auth/Signin'
import { Signup } from '@/pages/Auth/Signup'
import { SellerDashboard } from '@/pages/Seller/SellerDashboard'
import Cart from '@/pages/Buyer/cart'
import { AddProduct } from '@/pages/Seller/addProduct'
import { Auction } from '@/pages/Seller/auction/auction'
import ProductPage from '@/pages/Buyer/ProductPage'
import BuyerPage from '@/pages/Buyer/buyer_page'
import Rating from '@/pages/Buyer/Rating'
import KisanConnect from '@/pages/Seller/KisanConnect'
import Dashboard from '@/pages/Buyer/buyer'
import MyOrders from '@/pages/Buyer/my_orders'
import { Workshops } from '@/pages/Seller/Workshops'
const isAuthenticated = async () => {
  const token = localStorage.getItem('jwt')
  return token != null
}

const AppRoutes = () => {
  return (
    <Routes>
      {!isAuthenticated() ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/ai-chat" element={<Chat />} />
          <Route path="/buyer-page" element={<BuyerPage />} />
          <Route path="/buyer" element={<Dashboard />} />
          <Route path="/kisan-connect" element={<KisanConnect />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/" element={<SellerDashboard />} />
          <Route path="/workshops" element={<Workshops />} />
        </>
      )}
    </Routes>
  )
}

export default AppRoutes

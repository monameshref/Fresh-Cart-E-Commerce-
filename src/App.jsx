import React from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Cart from './Components/Cart/Cart'
import Notfound from './Components/Notfound/Notfound'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import AuthContextProvider from './Context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
import CartContextProvider from './Context/CartContext'
import WishlistContextProvider from './Context/WishlistContext'
import Wishlist from './Components/Wishlist/Wishlist'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import CashPayment from './Components/CashPayment/CashPayment'
import OnlinePayment from './Components/OnlinePayment/OnlinePayment'
import AllOrders from './Components/AllOrders/AllOrders'
import ButtonUp from './Components/ButtonUp/ButtonUp'

import { ToastContainer } from 'react-toastify'
import Brands from './Components/Brands/Brands'
import BrandDetails from './Components/BrandDetails/BrandDetails'
import Profile from './Components/Profile/Profile'
import { Offline } from 'react-detect-offline'
import { Helmet } from 'react-helmet'

const router = createBrowserRouter([{
  path: "/", element: <Layout />, children: [
    {index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute>},
    {path:"register", element: <Register />},
    {path:"login", element: <Login />},
    {path:"ForgotPassword", element: <ForgotPassword />},
    {path:"ResetPassword", element: <ResetPassword />},
    {path:"home", element: <ProtectedRoute> <Home /> </ProtectedRoute>},
    {path:"products", element: <ProtectedRoute> <Products /> </ProtectedRoute>},
    {path:"productDetails/:id", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute>},
    {path:"cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute>},
    {path:"wishlist", element: <ProtectedRoute> <Wishlist /> </ProtectedRoute>},
    {path:"Brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute>},
    {path:"BrandDetails/:id", element: <ProtectedRoute> <BrandDetails /> </ProtectedRoute>},
    {path:"CashPayment", element: <ProtectedRoute> <CashPayment /> </ProtectedRoute>},
    {path:"OnlinePayment", element: <ProtectedRoute> <OnlinePayment /> </ProtectedRoute>},
    {path:"AllOrders", element: <ProtectedRoute> <AllOrders /> </ProtectedRoute>},
    {path:"Profile", element: <ProtectedRoute> <Profile /> </ProtectedRoute>},

    {path:"*", element: <Notfound />,}
  ],
}]);

export default function App() {
  const queryClient = new QueryClient();
  return <>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <WishlistContextProvider>
          <CartContextProvider>
            <RouterProvider router={router} />
          </CartContextProvider>
        </WishlistContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>

    <ToastContainer theme='colored' />{/* Aleart Message */}
    <ButtonUp />

    <Offline>
      <div className='text-capitalize bg-black text-white px-3 py-1 rounded position-fixed start-0 bottom-0'>
        your internet connection has been corrupted...
      </div>
    </Offline>

    <Helmet>
    <link rel="icon" href="../src/assets/images/icoc.png" />
    </Helmet>

  </>
}

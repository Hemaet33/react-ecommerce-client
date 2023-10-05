import { useSelector } from 'react-redux'
import './App.css';
import Pay from './components/Pay'
import Success from './components/Success'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import {Navigate, Outlet, RouterProvider, createHashRouter} from 'react-router-dom'
import Navbar from './components/Navbar'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import Announcement from './components/Announcement'
import Sidebar from './components/sidebar/Sidebar'
import AdminHome from './pages/home/AdminHome'
import AdminProductList from './pages/productList/AdminProductList'
import AdminProduct from './pages/product/AdminProduct'
import AdminLogin from './pages/login/AdminLogin'
import UserList from './pages/userList/UserList'
import User from './pages/user/User'
import Topbar from './components/topbar/Topbar'
import NewProduct from './pages/newProduct/NewProduct'

function App() {
  const user=useSelector(state=>state.user.currentUser);
  const admin=useSelector(state=>state.user.currentUser?.isAdmin);


  const UserLayout = ()=>{
    return(
      <>
        <Navbar/>
        <Announcement />
        <Outlet />
        <Newsletter/>
        <Footer/>
      </>
    )
  }

  
  const AdminLayout = ()=>{
    return(
      <>
        <Topbar />
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
      </>
       )
  }

  const UserProtectedRoute = ({children})=>{
    if(!user){
      return <Navigate to="/login"/>
    }
    return children;
  }

  const AdminProtectedRoute = ({children})=>{
    if(!admin){
      return <Navigate to="/admin/login"/>
    }
    return children;
  }

  const router = createHashRouter([
    {
      path:"/",
      element:<UserProtectedRoute><UserLayout /></UserProtectedRoute>,
      children:[
        {
          path:"/",
          element:user?<><Navigate to="/"/><Home /></>:<Login />
        },
        {
          path:"/products/:category",
          element:<ProductList />
        },
        {
          path:"/product/:id",
          element:<Product />
        },
        {
          path:"/cart",
          element:<Cart />
        }
      ]
    },
    {
      path:"/login",
      element:user?<Navigate to="/"/>:<Login />
    },
    {
      path:"/register",
      element:user?<Navigate to="/"/>:<Register />
    },
    {
      path:"//pay/:amount",
      element:user && <Pay />
    },
    {
      path:"/success",
      element:user && <Success />
    },
    {
      path:"/admin",
      element:<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>,
      children:[
        {
          path:"/admin",
          element: admin ? <><Navigate to="/admin"/><AdminHome /></> : <><Navigate to="/admin/login"/><AdminLogin /></>
        },
        {
          path:"/admin/users",
          element:<UserList />
        },
        {
          path:"/admin/user/:userId",
          element:<User />
        },
        {
          path:"/admin/products",
          element:<AdminProductList />
        },
        {
          path:"/admin/product/:productId",
          element:<AdminProduct />
        },
        {
          path:"/admin/newproduct",
          element:<NewProduct />
        },
      ]
    },
    {
      path:"/admin/login",
      element:admin?<Navigate to="/admin"/>:<AdminLogin />
    }
  ])
  
  return(
    <RouterProvider router={router} />
  )
}

export default App

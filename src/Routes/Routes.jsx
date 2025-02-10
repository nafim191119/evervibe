import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import CategoryDetails from "../Pages/Home/AllProductCategory/CategoryDetails";
import ProductDetails from "../Pages/Home/AllProductCategory/ProductDetails";
import Products from "../Pages/Products/Products/Products";
import Login from "../Pages/Login/Login";
import SignIn from "../Pages/SignIn/SignIn";
import CartPage from "../Pages/Cart/CartPage";
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage";
// import CheckoutInfo from "../Pages/CheckoutInfo/CheckoutInfo";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/category/:category',
            element: <CategoryDetails></CategoryDetails>
        },
        {
            path:"/product/:id",
            element: <ProductDetails></ProductDetails>
        },
        {
            path:"/products",
            element: <Products></Products>
        },
        {
            path:"/login",
            element: <Login></Login>
        },
        {
            path:"/signup",
            element: <SignIn></SignIn>
        },
        {
            path:"/cart",
            element: <CartPage></CartPage>
        },
        {
            path:"/checkout",
            element: <CheckoutPage></CheckoutPage>
        },
      ]
    },
  ]);
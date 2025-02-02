import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import CategoryDetails from "../Pages/Home/AllProductCategory/CategoryDetails";
import ProductDetails from "../Pages/Home/AllProductCategory/ProductDetails";

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
        }
      ]
    },
  ]);
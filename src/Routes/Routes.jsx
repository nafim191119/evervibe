import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import CategoryDetails from "../Pages/Home/AllProductCategory/CategoryDetails";

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
        }
      ]
    },
  ]);
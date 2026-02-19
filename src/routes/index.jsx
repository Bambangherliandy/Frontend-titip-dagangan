import { createBrowserRouter, redirect } from "react-router-dom";
import PublicHome from "../pages/public/PublicHome";
import BaseLayout from "../pages/buyer/BaseLayout";
import Home from "../pages/buyer/Home";
import Checkout from "../pages/buyer/Checkout";
import Payment from "../pages/buyer/Payment";
import Login from "../pages/Login";
import RegisterUser from "../pages/RegisterUser";
import SellerDashboard from "../pages/seller/sellerDashboard";
import SellerRegister from "../pages/seller/sellerRegister";

const authLoader = () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw redirect("/login");
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicHome />,
    index: true,
  },
  {
    path: "/app",
    loader: authLoader,
    element: <BaseLayout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "checkout", element: <Checkout /> },
      { path: "payment/:order_id", element: <Payment /> },
      { path: "seller/register", element: <SellerRegister /> },
      { path: "seller/dashboard", element: <SellerDashboard /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterUser />,
  },
]);

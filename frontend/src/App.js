import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/layout/Header/Header.js";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";

import { useDispatch, useSelector } from "react-redux";
import UserOption from "./component/layout/Header/UserOption";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";

import MyOrders from "./component/Order/MyOrders";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import UpdatePasssword from "./component/User/UpdatePassword";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOption";
import OrderSuccess from "./component/Cart/OrderSuccess";
import Cookies from 'js-cookie'
import Contact from "./component/Home/contact";
import About from "./component/Home/About";
import OrderDetails from "./component/Order/OrderDetails";
import { getLocalStorage } from "./auth/helper";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const c1 = localStorage.getItem('token')

  console.log(c1);
  

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    
    store.dispatch(loadUser(c1));
  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/Search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password" element={<ResetPassword />} />
        <Route exact path="/contact" element={<Contact />} />
        
        <Route exact path="/about" element={<About />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />
          <Route exact path="/password/update" element={<UpdatePasssword />} />
          <Route exact path="/Cart" element={<Cart />} />
          <Route exact path="/useroption" element={<UserOption />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
          <Route exact path="/success" element={<OrderSuccess />} />
          <Route exact path="/orders" element={<MyOrders />} />
          <Route exact path="/process/payment" element={<Payment />} />
          <Route exact path="/order/:id" element={<OrderDetails />} />
        </Route>

        {/* <Route exact path="/process/payment" element={<Payment />} /> */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

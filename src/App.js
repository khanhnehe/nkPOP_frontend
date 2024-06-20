import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { path } from "./utils/constant";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Test from "./pages/test";
import Loader from "./components/Loader";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import { history } from './store/reduxStore';
import Profile from "./pages/profile/Profile";
import MyOrder from "./pages/profile/MyOrder";
import HomeAdmin from "./pages/home/HomeAdmin";
import System from "./router/System";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import Banner from "./components/Banner";
import TypePage from "./pages/Type_Brand_page/TypePage";
import BrandPage from "./pages/Type_Brand_page/BrandPage";
import InfoProduct from "./pages/IngfoProfuct/InfoProduct";
import CartOrder from "./pages/Cart/CartOrder";
import CheckOut from "./pages/Cart/CheckOut";
import ProductSearch from "./components/ProductSearch";


function App() {

  return (
    <Router>

      <Routes>
        <Route path={path.SYSTEM + "/*"} element={<System />} />
        <Route path={path.CHECK_OUT} element={<CheckOut />} />
        <Route path="/*" element={
          <Fragment>
            <Header />
            <Banner />
            <Routes>
              <Route path={path.HOMEPAGE} element={<Home />} />
              <Route path={path.TEST} element={<Test />} />
              <Route path={path.LOGIN} element={<Login />} />
              <Route path={path.REGISTER} element={<Register />} />
              <Route path={path.PROFILE} element={<Profile />} />
              <Route path={path.MY_ORDER} element={<MyOrder />} />
              <Route path={path.CATEGORY_PAGE} element={<CategoryPage />} />
              <Route path={path.TYPE_PAGE} element={<TypePage />} />
              <Route path={path.BRAND_PAGE} element={<BrandPage />} />
              <Route path={path.INFO_PRODUCT} element={<InfoProduct />} />
              <Route path={path.CART} element={<CartOrder />} />
              <Route path={path.SEARCH_PRODUCT} element={<ProductSearch />} />
            </Routes>
            <Footer />
          </Fragment>
        } />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
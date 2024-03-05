import React, { Fragment } from "react";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path={path.SYSTEM + "/*"} element={<System />} />
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
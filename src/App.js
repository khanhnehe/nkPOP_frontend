import React, { Component, Fragment } from "react";
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
import { connect } from "react-redux";
import { history } from './store/reduxStore';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <Header />
            <Routes>
              <Route path={path.HOMEPAGE} element={<Home />} />
              <Route path={path.TEST} element={<Test />} />
              <Route path={path.LOGIN} element={<Login />} />
              <Route path={path.REGISTER} element={<Register />} />
            </Routes>
            <Footer />
          </div>
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
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
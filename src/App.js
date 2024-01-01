import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { path } from "./utils/constant";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Test from "./pages/test";
import Loader from "./components/Loader";

function App() {
  return (
    <Router>
      <div className="main-container">
        {/* <Loader /> */}
        <Header />
        <Routes>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.TEST} element={<Test />} />
          {/* Other routes can be added here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

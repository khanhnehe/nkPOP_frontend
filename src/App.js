import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="main-container">

        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Other routes can be added here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

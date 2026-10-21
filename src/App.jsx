import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import HomePage from "./components/Homepage";
import Footer from "./components/Footer";
import Aboutus from "./components/Aboutus";
import Events from "./components/Events";
import ContactUs from "./components/ContactUs";
import Team from "./components/Team";
import AdminPage from "./components/Admin";
import Services from "./components/Services";

function App() {
  return (
    <Router>
      <LoadingProvider>
        <div className="relative min-h-screen bg-gray-100">
          <Loader />
          <div className="overflow-hidden">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/team" element={<Team />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/services" element={<Services />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </LoadingProvider>
    </Router>
  );
}

export default App;

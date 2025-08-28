import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Admin from "./pages/Admin.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ParticipantDetails from "./pages/ParticipantDetails.jsx";
import Loader from "./components/Loader.jsx";
import About from "./pages/About.jsx";
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Minimum loader time (0.8s)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    // Simulate network/data loading (replace with real API calls if needed)
    const fakeFetch = new Promise((resolve) => setTimeout(resolve, 1500));

    fakeFetch.then(() => setLoading(false));

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />; // Show loader until finished
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-datm" element={<About/>}/>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/participant/:id"
            element={<ParticipantDetails />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;

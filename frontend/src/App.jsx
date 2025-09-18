import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import MyProfile from "./pages/MyProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import DoctorRegister from "./pages/DoctorRegister.jsx";
import DoctorLogin from "./pages/DoctorLogin.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-appointments" element={
          <ProtectedRoute requiredRole="patient">
            <MyAppointments />
          </ProtectedRoute>
        } />
        <Route path="/appointments/:docid" element={
          <ProtectedRoute requireAuth={true}>
            <Appointment />
          </ProtectedRoute>
        } />
        <Route path="/my-profile" element={
          <ProtectedRoute requireAuth={true}>
            <MyProfile />
          </ProtectedRoute>
        } />
        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-dashboard" element={
          <ProtectedRoute requiredRole="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

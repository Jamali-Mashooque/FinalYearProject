import { Routes, Route, useLocation } from "react-router-dom"

import Navbar from "./component/Navbar";
import Home from "./component/pages/Home";
import AboutUs from "./component/pages/AboutUs";
import Contact from "./component/pages/Contact";
import Register from "./component/pages/Register";
import Dashboard from "./component/Dashboard/Dashboard";
import AdminDashboard from "./component/AdminDashboard/AdminDashboard";
import SetPassword from "./component/pages/SetPassword";
import Login from "./component/pages/Login";
import ProtectedRoute from "./component/ProtectedRoute";
import StudentProtectedRoute from "./component/ProtectedRoutes/StudentProtectedRoute";
import AdminProtectedRoute from "./component/ProtectedRoutes/AdminProtectedRoute";
import ScrollToTop from "./component/ScrollToTop";
// import Profile from "./component/Dashboard/Profile/Profile";

function App() {
  const location =useLocation();
  return (
    <>
    <ScrollToTop />
     {!["/dashboard", "/admin"].includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/set-password/:token" element={<SetPassword />}/>
        <Route path="/login" element={<Login />} />
        


       <Route
  path="/dashboard"
  element={
    <StudentProtectedRoute>
      <Dashboard />
    </StudentProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>
      </Routes>
      
    </>
  );
}

export default App;
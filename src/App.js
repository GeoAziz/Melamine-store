import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/LoginPage";
import Register from "./pages/Register";
import ForgotPassword from "./pages/forgotpassword";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/cart";  // Import Cart component
import Checkout from "./pages/checkout";  // Import Checkout component
import Confirmation from "./pages/confirmation"; // Import Confirmation page

function App() {
  return (
    <CartProvider> {/* Wrap the entire app with CartProvider */}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} /> {/* Cart page */}
            <Route path="/checkout" element={<Checkout />} /> {/* Checkout page */}
            <Route path="/confirmation" element={<Confirmation />} /> {/* Confirmation page */}
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/dashboard', '/login', '/register', '/forgotpassword']; // Add paths that hide Navbar

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      {children}
    </>
  );
}

export default App;

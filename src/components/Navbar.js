import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaShoppingCart, FaUserCircle, FaTimes } from "react-icons/fa";

// Navbar container with glassmorphism effect
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.1); /* Transparent background */
  color: white;
  flex-wrap: wrap;
  position: relative;
  backdrop-filter: blur(10px); /* Apply blur effect to background */
  border-radius: 10px; /* Slightly rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow to create depth */
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Styling for Logo with improved visibility and UI
const Logo = styled.h1`
  font-size: 2.5rem; /* Increase the font size for better visibility */
  font-weight: bold;
  color: white; /* Make the logo text white for better contrast */
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Add subtle shadow to the text */
  transition: all 0.3s ease;

  /* Optional: Glow effect for better visibility */
  &:hover {
    color: #ff6f61; /* Change the logo color when hovered */
    text-shadow: 0 0 10px rgba(255, 111, 97, 0.7); /* Glow effect */
  }
`;

// NavLinks container for desktop & mobile styles
const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    display: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    width: 250px;
    height: 100vh;
    background-color: rgba(51, 51, 51, 0.8); /* Slightly transparent for mobile menu */
    text-align: center;
    padding: 2rem 1rem;
    transition: transform 0.3s ease-out;
    transform: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? "translateX(0)" : "translateX(100%)")};
  }

  @media (min-width: 769px) {
    display: flex;
    gap: 2rem;
  }
`;

// NavLink component styling
const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6f61;
  }
`;

// Shopping Cart Icon with Link to Cart Page
const CartIcon = styled(FaShoppingCart)`
  font-size: 2rem;
  cursor: pointer;
`;

// FaUserCircle icon for mobile and desktop view with black color
const UserIcon = styled(FaUserCircle)`
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  color: black;  /* Set the color to black */
`;

// Close icon for mobile menu
const CloseIcon = styled(FaTimes)`
  font-size: 2rem;
  cursor: pointer;
  display: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Dropdown for authentication links (Login/Register)
const AuthDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  background-color: rgba(51, 51, 51, 0.9); /* Slightly transparent dropdown */
  min-width: 160px;
  z-index: 1;
  top: 100%;
  right: 0;
  padding: 0.5rem;
  text-align: center;
  transition: opacity 0.3s ease;

  & a {
    padding: 0.5rem 1rem;
    display: block;
    color: white;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  & a:hover {
    background-color: #555;
  }
`;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAuthDropdown = () => {
    setIsAuthDropdownOpen(!isAuthDropdownOpen);
  };

  return (
    <NavbarContainer>
      <Logo>Melamine Store</Logo>

      {/* FaUserCircle Icon - Always visible on all screen sizes */}
      <UserIcon onClick={toggleMobileMenu} />

      {/* Close Icon - Show only when mobile menu is open */}
      {isMobileMenuOpen && <CloseIcon onClick={toggleMobileMenu} />}

      {/* Navigation Links */}
      <NavLinks isMobileMenuOpen={isMobileMenuOpen}>
        <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
        <NavLink to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</NavLink>
        <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink>
        <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
        
        {/* Cart Icon - Click redirects to /cart page */}
        <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
          <CartIcon />
        </Link>

        {/* Auth Dropdown for Login/Register */}
        <AuthDropdown>
          <NavLink to="#" onClick={toggleAuthDropdown}>
            Login / Register
          </NavLink>
          <DropdownContent isOpen={isAuthDropdownOpen}>
            <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              Login
            </NavLink>
            <NavLink to="/register" onClick={() => setIsMobileMenuOpen(false)}>
              Register
            </NavLink>
          </DropdownContent>
        </AuthDropdown>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;

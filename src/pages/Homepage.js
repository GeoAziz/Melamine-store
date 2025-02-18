import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { FaSpinner } from "react-icons/fa"; // Spinner icon
import { FaPaintBrush, FaShippingFast, FaHammer } from 'react-icons/fa'; // Service Icons
import melamineHero from "../assets/mellamine-hero.png"; // Import image from assets
import diningSetImage from "../assets/plateset4.png"; // Add all your images this way
import servingPlatterImage from "../assets/kitchencab.jpg";
import storageBinImage from "../assets/storagebox.png";
import picnicSetImage from "../assets/paaub1i7.png";
import customPlattersImage from "../assets/plateset3.png";
import cuttingBoardImage from "../assets/kitchenshelf.png";

// Styled Components
const HomeContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const HeroSection = styled.div`
  background-image: url(${melamineHero});
  background-size: cover;
  background-position: center;
  height: 400px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4); /* Dark overlay */
`;

const HeroText = styled(motion.h1)`
  font-size: 3rem;
  margin: 0;
  z-index: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroButton = styled.button`
  background-color: #ff6f61;
  color: white;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1.1rem;
  border-radius: 5px;
  z-index: 1;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #e54b44;
    transform: scale(1.05);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-top: 2rem;
`;

const FeaturedSection = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: start;
  margin-top: 3rem;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

const FeaturedContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: nowrap;
`;

const ServicesSection = styled.div`
  background-color: #f9f9f9;
  padding: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 200px;
  margin: 1rem auto;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  color: #ff6f61;
  margin-bottom: 1rem;
`;

const TestimonialSection = styled.div`
  background-color: #ecf0f1;
  padding: 2rem;
  margin-top: 4rem;
`;

const TestimonialCard = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 1rem;
`;

const LoadingSpinner = styled.div`
  color: #ff6f61;
  font-size: 2rem;
  animation: spin 1s infinite linear;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Main Component
const HomePage = () => {
  const [loading, setLoading] = useState(false);

  const handleBrowseClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/shop"; // Redirect to shop page
    }, 2000); // Simulate loading time before redirect
  };

  return (
    <HomeContainer>
      <HeroSection>
        <HeroOverlay />
        <HeroText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Transform Your Home with Premium Melamine
        </HeroText>
        <HeroButton onClick={handleBrowseClick} aria-label="Browse our collection of melamine products">
          {loading ? (
            <LoadingSpinner>
              <FaSpinner />
            </LoadingSpinner>
          ) : (
            "Browse Our Collection"
          )}
        </HeroButton>
      </HeroSection>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <SectionTitle>Featured Products</SectionTitle>
        <FeaturedSection>
          <FeaturedContainer>
            {/* Static Featured Products Section */}
            <ProductCard 
              title="Modern Melamine Dining Set" 
              image={diningSetImage} 
              description="Sleek design, perfect for contemporary dining rooms."
            />
            <ProductCard 
              title="Melamine Serving Platter" 
              image={servingPlatterImage} 
              description="Elegant and durable serving platter for your special occasions."
            />
            <ProductCard 
              title="Melamine Storage Bin" 
              image={storageBinImage} 
              description="Stylish and functional storage solution for any room."
            />
            <ProductCard 
              title="Melamine Picnic Set" 
              image={picnicSetImage} 
              description="Perfect for outdoor dining, durable and stylish."
            />
            <ProductCard 
              title="Custom Melamine Platters" 
              image={customPlattersImage} 
              description="Create unique, personalized platters to suit your style."
            />
            <ProductCard 
              title="Melamine Cutting Board" 
              image={cuttingBoardImage} 
              description="Durable and sleek cutting board for all your kitchen needs."
            />
          </FeaturedContainer>
        </FeaturedSection>
      </motion.div>

      {/* Our Services Section */}
      <ServicesSection>
        <SectionTitle>Our Services</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          <ServiceCard>
            <ServiceIcon><FaPaintBrush /></ServiceIcon>
            <h3>Custom Design</h3>
            <p>Tailored designs to fit your home decor.</p>
          </ServiceCard>
          <ServiceCard>
            <ServiceIcon><FaShippingFast /></ServiceIcon>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable delivery at your doorstep.</p>
          </ServiceCard>
          <ServiceCard>
            <ServiceIcon><FaHammer /></ServiceIcon>
            <h3>Expert Craftsmanship</h3>
            <p>Handcrafted with care and precision.</p>
          </ServiceCard>
        </div>
      </ServicesSection>

      {/* Customer Testimonials Section */}
      <TestimonialSection>
        <SectionTitle>What Our Customers Say</SectionTitle>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <TestimonialCard>
            <p>"The Modern Dining Set changed my dining experience! Love the quality!"</p>
            <span>- Sarah M.</span>
          </TestimonialCard>
          <TestimonialCard>
            <p>"Fast delivery and beautiful design. Highly recommend!"</p>
            <span>- John D.</span>
          </TestimonialCard>
        </div>
      </TestimonialSection>
    </HomeContainer>
  );
};

export default HomePage;

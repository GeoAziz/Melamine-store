import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaCreditCard, FaBox, FaBell, FaUserCircle, FaHistory, FaHome } from 'react-icons/fa';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications] = useState([
    'Your order #1234 has been shipped.',
    'Earn double loyalty points this weekend!',
    'New promotions available on selected products.',
  ]);

  useEffect(() => {
    return () => {
      // Cleanup logic
    };
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" />;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <Container
      as={motion.div}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Header>
        <Logo>ClientZone</Logo>
        <MenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaUserCircle />
        </MenuToggle>
      </Header>

      <Sidebar isOpen={isMenuOpen}>
        <Nav>
          <NavItem onClick={() => navigate('/')}>
            <FaHome /> Home
          </NavItem>
          <NavItem onClick={() => navigate('/dashboard')}>
            <FaBox /> Dashboard
          </NavItem>
          <NavItem onClick={() => navigate('/orders')}>
            <FaHistory /> Orders
          </NavItem>
          <NavItem onClick={() => navigate('/wallet')}>
            <FaCreditCard /> Wallet
          </NavItem>
          <NavItem onClick={() => navigate('/profile')}>
            <FaUserCircle /> Profile
          </NavItem>
          <LogoutButton onClick={handleLogout}>
            Logout
          </LogoutButton>
        </Nav>
      </Sidebar>

      <MainContent isOpen={isMenuOpen}>
        <DashboardCard>
          <DashboardTitle>Welcome back, {user.username}</DashboardTitle>

          <InfoSection>
            <InfoCard>
              <InfoTitle>Account Balance</InfoTitle>
              <InfoValue>$150.00</InfoValue>
            </InfoCard>
            <InfoCard>
              <InfoTitle>Loyalty Points</InfoTitle>
              <InfoValue>320</InfoValue>
            </InfoCard>
          </InfoSection>

          <SectionTitle>Order History</SectionTitle>
          <OrderHistory>
            <OrderCard>
              <OrderDetails>
                <div>Order #1234</div>
                <div>Status: Shipped</div>
              </OrderDetails>
              <OrderAction>Track</OrderAction>
            </OrderCard>
            <OrderCard>
              <OrderDetails>
                <div>Order #5678</div>
                <div>Status: Delivered</div>
              </OrderDetails>
              <OrderAction>Reorder</OrderAction>
            </OrderCard>
          </OrderHistory>

          <SectionTitle>Notifications</SectionTitle>
          <Notifications>
            {notifications.map((notification, index) => (
              <Notification key={index}>{notification}</Notification>
            ))}
          </Notifications>
        </DashboardCard>
      </MainContent>

      <Footer>
        <FooterLink href="/privacy">Privacy Policy</FooterLink>
        <FooterLink href="/terms">Terms & Conditions</FooterLink>
        <FooterLink href="/support">Support</FooterLink>
      </Footer>
    </Container>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8f9fa;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
`;

const Sidebar = styled.aside`
  position: fixed;
  left: 0;
  top: 60px;
  width: 250px;
  height: calc(100vh - 60px);
  background: white;
  box-shadow: 2px 0 4px rgba(0,0,0,0.1);
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 900;
`;

const Nav = styled.nav`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;

  &:hover {
    background-color: #f8f9fa;
    color: #007bff;
  }
`;

const LogoutButton = styled.button`
  margin-top: auto;
  padding: 0.75rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
`;

const MainContent = styled.main`
  margin-left: ${props => props.isOpen ? '250px' : '0'};
  margin-top: 60px;
  padding: 2rem;
  transition: margin-left 0.3s ease;
  animation: ${fadeIn} 0.5s ease;
`;

const DashboardCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  animation: ${slideIn} 0.5s ease;
`;

const DashboardTitle = styled.h1`
  margin-bottom: 2rem;
  color: #343a40;
`;

const InfoSection = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const InfoCard = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  flex: 1;
`;

const InfoTitle = styled.div`
  color: #6c757d;
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
`;

const SectionTitle = styled.h2`
  margin: 2rem 0 1rem;
  color: #343a40;
`;

const OrderHistory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderDetails = styled.div`
  font-size: 1rem;
  color: #343a40;
`;

const OrderAction = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const Notifications = styled.div`
  margin-top: 1rem;
`;

const Notification = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const Footer = styled.footer`
  padding: 1rem;
  background-color: #343a40;
  color: white;
  text-align: center;
  margin-top: auto;
`;

const FooterLink = styled.a`
  color: white;
  margin: 0 15px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default ClientDashboard;
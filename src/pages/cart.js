import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, addToCart, removeFromCart, getTotalPrice, loading } = useContext(CartContext);
  const navigate = useNavigate();

  const handleIncrement = (productId) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      addToCart(product);  // This will increase the quantity of the product
    }
  };

  const handleDecrement = (productId) => {
    const product = cart.find(item => item.id === productId);
    if (product && product.quantity > 1) {
      product.quantity -= 1;
      removeFromCart(productId);  // This will call the context to update cart after decrementing
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <CartContainer>
      {cart.length === 0 ? (
        <EmptyCartMessage>
          <h2>Your cart is empty.</h2>
          <p>Go back to the <button onClick={() => navigate('/shop')}>shop</button> to add items to your cart.</p>
        </EmptyCartMessage>
      ) : (
        <>
          <CartTitle>
            <h2>Your Cart</h2>
          </CartTitle>
          <CartItems>
            {cart.map(item => (
              <CartItem key={item.id}>
                <ItemDetails>
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                </ItemDetails>
                <PriceAndControls>
                  <p>${item.price}</p>
                  <QuantityControl>
                    <button onClick={() => handleDecrement(item.id)}><FaMinus /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item.id)}><FaPlus /></button>
                  </QuantityControl>
                  <RemoveButton onClick={() => removeFromCart(item.id)}>
                    <FaTrashAlt />
                  </RemoveButton>
                </PriceAndControls>
              </CartItem>
            ))}
          </CartItems>
          <TotalAmount>
            <h3>Total: ${getTotalPrice()}</h3>
          </TotalAmount>
          <CheckoutButton onClick={() => navigate('/checkout')}>Proceed to Checkout</CheckoutButton>
        </>
      )}
    </CartContainer>
  );
};

const Spinner = () => (
  <SpinnerWrapper>
    <div className="spinner"></div>
  </SpinnerWrapper>
);

const CartContainer = styled.div`
  padding: 2rem;
`;

const CartTitle = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CartItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  display: flex;
  gap: 1rem;

  img {
    width: 50px;
    height: auto;
  }
`;

const PriceAndControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    background: #3498db;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 1rem;
    border-radius: 50%;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  span {
    font-size: 1.5rem;
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #e74c3c;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const TotalAmount = styled.div`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const CheckoutButton = styled.button`
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 2rem auto;

  &:hover {
    background-color: #34495e;
  }

  &:focus {
    outline: none;
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;

  button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default Cart;

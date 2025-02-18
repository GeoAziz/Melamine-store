import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartFromBackend = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch cart data');
      }

      const cartData = await res.json();
      console.log('Fetched Cart Data:', cartData);
      setCart(cartData.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      // Check if the product is already in the cart
      const existingProduct = cart.find(item => item.id === product.id);
      
      if (existingProduct) {
        // If the product exists, increment the quantity
        existingProduct.quantity += 1;
      } else {
        // If the product doesn't exist, add it with quantity 1
        cart.push({ ...product, quantity: 1 });
      }

      const res = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (!res.ok) {
        throw new Error('Failed to add product to cart');
      }

      const updatedCart = await res.json();
      setCart(updatedCart.items || []);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch('http://localhost:5000/api/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        throw new Error('Failed to remove product from cart');
      }

      const updatedCart = await res.json();
      setCart(updatedCart.items || []);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    fetchCartFromBackend();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export { useCart };

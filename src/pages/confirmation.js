import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ConfirmationPage = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // Get order details from location state or localStorage
        const details = location.state?.orderDetails || JSON.parse(localStorage.getItem('orderDetails'));
        setOrderDetails(details);
    }, [location]);

    const ContainerStyle = styled.div`
        max-width: 800px;
        margin: 50px auto;
        padding: 2rem;
        text-align: center;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
    `;

    return (
        <ContainerStyle>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1 }}
                >
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4CAF50"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ color: '#2E3B55', marginTop: '1rem' }}
                >
                    Order Confirmed!
                </motion.h1>

                {orderDetails && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="order-details"
                        style={{ margin: '2rem 0' }}
                    >
                        <h2>Order Details</h2>
                        <p>Order ID: {orderDetails.orderId}</p>
                        <p>Total Amount: ${orderDetails.total}</p>
                        <p>Shipping Address: {orderDetails.shippingAddress}</p>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p style={{ color: '#666', marginBottom: '2rem' }}>
                        Thank you for your purchase! We'll send you an email with your order details.
                    </p>

                    <Link to="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: '12px 24px',
                                background: '#2E3B55',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            Continue Shopping
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>
        </ContainerStyle>
    );
};

export default ConfirmationPage;
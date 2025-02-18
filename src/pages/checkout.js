import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';  // Import the useCart hook for dynamic cart data

// Styled Components
const CheckoutContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const Form = styled.form`
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const Button = styled.button`
    background: #007bff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-size: 1.1rem;
    transition: background 0.3s;

    &:hover {
        background: #0056b3;
    }

    &:disabled {
        background: #cccccc;
    }
`;

const CartSummary = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
`;

const SuccessMessage = styled.div`
    background: #d4edda;
    color: #155724;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
`;

const LoadingSpinner = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 20px auto;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, getTotalPrice } = useCart();  // Use dynamic cart data and the getTotalPrice function from context
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const total = getTotalPrice();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Process M-Pesa payment (updated with ngrok URL)
    const processmpesaPayment = async () => {
        try {
            // Use your ngrok public URL for API calls
            const response = await fetch('https://df65-102-215-76-158.ngrok-free.app/api/mpesa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: formData.phone,
                    amount: total,
                }),
            });

            if (!response.ok) throw new Error('Payment failed');

            return await response.json();
        } catch (error) {
            throw new Error('Payment processing failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Process M-Pesa payment
            await processmpesaPayment();

            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 2000));

            setSuccess(true);
            setLoading(false);

            setTimeout(() => {
                navigate('/confirmation');  // Redirect to confirmation page after successful payment
            }, 2000);

        } catch (error) {
            setLoading(false);
            alert('Payment failed. Please try again.');
        }
    };

    return (
        <CheckoutContainer>
            <div>
                <h2>Checkout Information</h2>
                {success && (
                    <SuccessMessage>
                        Payment successful! Redirecting to order confirmation...
                    </SuccessMessage>
                )}
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number (for M-Pesa)"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type="text"
                        name="address"
                        placeholder="Delivery Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <Button type="submit" disabled={loading}>
                            Pay with M-Pesa
                        </Button>
                    )}
                </Form>
            </div>

            <CartSummary>
                <h2>Order Summary</h2>
                {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
                        <span>{item.name}</span>
                        <span>KES {item.price.toLocaleString()}</span>
                    </div>
                ))}
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '1rem' }}>
                    <span>Total</span>
                    <span>KES {total.toLocaleString()}</span>
                </div>
            </CartSummary>
        </CheckoutContainer>
    );
};

export default Checkout;

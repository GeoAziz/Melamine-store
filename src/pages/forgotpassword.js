// ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordRecovery = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Simulate an API call to send password recovery email
            await new Promise(resolve => setTimeout(resolve, 1500));

            // You can integrate actual password recovery logic here
            alert('Password recovery email sent!');
            navigate('/login');
        } catch (err) {
            setError('Failed to send recovery email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <Container
            as={motion.div}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
        >
            <FormCard>
                <LogoContainer>
                    <Logo>🌟</Logo>
                </LogoContainer>
                <Title>Forgot Password?</Title>
                <Form onSubmit={handlePasswordRecovery}>
                    <InputGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            disabled={isLoading}
                        />
                    </InputGroup>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        as={motion.button}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? <LoadingSpinner /> : 'Submit'}
                    </Button>
                    <LoginLink to="/login">
                        Back to Login
                    </LoginLink>
                </Form>
            </FormCard>
        </Container>
    );
};

// Animations
const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

// Styled Components
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px;
    animation: ${fadeIn} 0.5s ease-out;
`;

const FormCard = styled.div`
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 400px;
    transform-origin: center;
    animation: ${fadeIn} 0.5s ease-out;
`;

const LogoContainer = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

const Logo = styled.div`
    font-size: 48px;
    animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h1`
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 24px;
    animation: ${fadeIn} 0.5s ease-out;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    color: #666;
    font-size: 14px;
    font-weight: 500;
`;

const Input = styled.input`
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
    }
`;

const Button = styled.button`
    background: #007bff;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
        background: #0056b3;
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;

const StyledLink = styled(Link)`
    text-align: center;
    color: #007bff;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;

    &:hover {
        color: #0056b3;
        text-decoration: underline;
    }
`;

const LoginLink = styled(StyledLink)`
    margin-top: 10px;
`;

const ErrorMessage = styled.div`
    color: #dc3545;
    font-size: 14px;
    text-align: center;
    animation: ${fadeIn} 0.3s ease-out;
`;

const LoadingSpinner = styled.div`
    width: 20px;
    height: 20px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #007bff;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin: 0 auto;
`;

export default ForgotPassword;

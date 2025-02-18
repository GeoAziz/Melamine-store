import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            
            // Successfully logged in
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
            
        } catch (err) {
            // Handle the specific error message from the API
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
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
                <Title>Welcome Back</Title>
                <Form onSubmit={handleLogin}>
                    <InputGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            disabled={isLoading}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            disabled={isLoading}
                        />
                    </InputGroup>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <ForgotPasswordLink to="/forgotpassword">
                        Forgot Password?
                    </ForgotPasswordLink>
                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        as={motion.button}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? <LoadingSpinner /> : 'Login'}
                    </Button>
                    <RegisterLink to="/register">
                        Don't have an account? Register here
                    </RegisterLink>
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

const ForgotPasswordLink = styled(StyledLink)`
    align-self: flex-end;
    margin-top: -10px;
`;

const RegisterLink = styled(StyledLink)`
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

export default Login;

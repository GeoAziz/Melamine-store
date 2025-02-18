import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <ContactContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <ContactTitle
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
            >
                Contact Us
            </ContactTitle>
            
            <ContactForm onSubmit={handleSubmit}>
                <FormField
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </FormField>

                <FormField
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </FormField>

                <FormField
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </FormField>

                <SubmitButton
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Send Message
                </SubmitButton>
            </ContactForm>
        </ContactContainer>
    );
};

const ContactContainer = styled(motion.div)`
    max-width: 800px;
    margin: 0 auto;
    padding: 4rem 2rem;
`;

const ContactTitle = styled(motion.h1)`
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
    font-size: 2.5rem;
`;

const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const FormField = styled(motion.div)`
    input, textarea {
        width: 100%;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s;

        &:focus {
            outline: none;
            border-color: #4a90e2;
        }
    }

    textarea {
        min-height: 150px;
        resize: vertical;
    }
`;

const SubmitButton = styled(motion.button)`
    background-color: #4a90e2;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    margin-top: 1rem;

    &:hover {
        background-color: #357abd;
    }
`;

export default ContactPage;
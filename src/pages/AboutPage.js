import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AboutPage = () => {
    return (
        <StyledAbout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="about-container"
            >
                <motion.h1 
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    About Melamine Home Store
                </motion.h1>

                <motion.div 
                    className="content-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2>Our Story</h2>
                    <p>Welcome to Melamine Home Store, where quality meets style in every piece of furniture we offer. Established with a passion for creating beautiful living spaces, we've been serving our community with premium melamine furniture solutions.</p>
                </motion.div>

                <motion.div 
                    className="features"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="feature-item">
                        <h3>Quality Products</h3>
                        <p>We source only the finest materials for our furniture.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Custom Design</h3>
                        <p>Tailored solutions to match your unique style.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Expert Service</h3>
                        <p>Professional guidance throughout your purchase journey.</p>
                    </div>
                </motion.div>
            </motion.div>
        </StyledAbout>
    );
};

const StyledAbout = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    .about-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    h1 {
        font-size: 2.5rem;
        color: #333;
        margin-bottom: 1rem;
    }

    .content-section {
        background: #f8f8f8;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        h2 {
            color: #444;
            margin-bottom: 1rem;
        }

        p {
            line-height: 1.6;
            color: #666;
        }
    }

    .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .feature-item {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease;

        &:hover {
            transform: translateY(-5px);
        }

        h3 {
            color: #333;
            margin-bottom: 0.5rem;
        }

        p {
            color: #666;
        }
    }

    @media (max-width: 768px) {
        padding: 1rem;
        
        h1 {
            font-size: 2rem;
        }

        .features {
            grid-template-columns: 1fr;
        }
    }
`;

export default AboutPage;
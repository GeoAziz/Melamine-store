import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { CartContext } from '../context/CartContext';
import { FaInfoCircle, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Import the images
import diningSetImage from '../assets/dinningset.jpg';
import wardrobeImage from '../assets/wardrobe.jpg';
import kitchenCabinetImage from '../assets/kitchencabinet.jpg';
import diningSet1Image from '../assets/dinningset1.jpg';
import deskOrganizerImage from '../assets/deskorganizer.jpg';
import plateSetImage from '../assets/plateset1.png';
import storageBoxImage from '../assets/storagebox.png';
import bookshelfImage from '../assets/bookshelf1.png';
import officeDeskImage from '../assets/officedesk.png';
import kitchenShelfImage from '../assets/kitchenshelf.png';

// Placeholder method for checking if user is logged in
const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return !!token;
};

// Cart Context Provider
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (product) => {
        setCart((prevCart) => {
            const productExists = prevCart.some(item => item.id === product.id);
            if (productExists) {
                return prevCart;
            } else {
                const updatedCart = [...prevCart, product];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                return updatedCart;
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Main ShopPage Component
const ShopPage = () => {
    const { addToCart } = useContext(CartContext); 
    const [products] = useState([
        { id: 1, name: 'Modern Dining Set', price: 899, category: 'Dining Sets', image: diningSetImage, description: 'A sleek and modern dining set made of premium melamine material.' },
        { id: 2, name: 'Classic Dining Set', price: 499, category: 'Dining Sets', image: diningSet1Image, description: 'A timeless design for your dining area, made with quality melamine.' },
        { id: 3, name: 'Wooden Wardrobe', price: 799, category: 'Storage', image: wardrobeImage, description: 'A large wardrobe perfect for all your clothing needs, crafted from melamine.' },
        { id: 4, name: 'Stackable Storage Boxes', price: 99, category: 'Storage', image: storageBoxImage, description: 'Compact and stackable storage boxes to organize your space.' },
        { id: 5, name: 'Kitchen Shelf', price: 199, category: 'Kitchen & Furniture', image: kitchenShelfImage, description: 'A sturdy and stylish kitchen shelf for storing your kitchenware.' },
        { id: 6, name: 'Kitchen Cabinet', price: 699, category: 'Kitchen & Furniture', image: kitchenCabinetImage, description: 'A multi-purpose cabinet for your kitchen, designed with melamine for durability.' },
        { id: 7, name: 'Office Desk Organizer', price: 49, category: 'Office Supplies', image: deskOrganizerImage, description: 'A compact organizer to keep your office desk tidy and functional.' },
        { id: 8, name: 'Office Desk', price: 299, category: 'Office Supplies', image: officeDeskImage, description: 'A modern office desk with a clean design, perfect for any workspace.' },
        { id: 9, name: 'Melamine Plate Set', price: 39, category: 'Dining Sets', image: plateSetImage, description: 'Durable and elegant melamine plates for your dining table.' },
        { id: 10, name: 'Bookshelf', price: 129, category: 'Storage', image: bookshelfImage, description: 'A tall bookshelf made of melamine material for your books and decor.' },
    ]);

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    const filterProducts = (category) => {
        setActiveCategory(category);
        if (category === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category === category));
        }
    };

    const handleAddToCart = (product) => {
        if (!isAuthenticated()) {
            navigate('/login'); 
            return;
        }
        addToCart(product);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <PageContainer>
            <Header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1>Our Collections</h1>
                <p>Discover our premium melamine products for home and office</p>
            </Header>

            <FilterContainer>
                <FilterScrollContainer>
                    {['All', 'Dining Sets', 'Storage', 'Kitchen & Furniture', 'Office Supplies'].map(category => (
                        <FilterButton
                            key={category}
                            active={activeCategory === category}
                            onClick={() => filterProducts(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </FilterButton>
                    ))}
                </FilterScrollContainer>
            </FilterContainer>

            <ProductGrid>
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ProductImage>
                            <img
                                src={product.image}
                                alt={product.name}
                                loading="lazy"
                            />
                            <IconContainer>
                                <FaInfoCircle size={30} color="#fff" />
                                <FaShoppingCart size={30} color="#fff" onClick={() => handleAddToCart(product)} />
                            </IconContainer>
                        </ProductImage>
                        <ProductInfo>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <Price>${product.price}</Price>
                            <AddToCartButton
                                whileHover={{ backgroundColor: '#2c3e50' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </AddToCartButton>
                        </ProductInfo>
                    </ProductCard>
                ))}
            </ProductGrid>

            <Toast show={showToast}>Item added to cart!</Toast>

            <EducationalContent>
                <h2>Why Melamine?</h2>
                <p>Melamine is a durable, heat-resistant material perfect for kitchenware, storage, and home decor. It's lightweight, easy to clean, and comes in a variety of stylish designs!</p>
                <ul>
                    <li>Highly durable and long-lasting.</li>
                    <li>Resistant to heat and scratches.</li>
                    <li>Lightweight and easy to handle.</li>
                    <li>Eco-friendly and versatile material.</li>
                </ul>
            </EducationalContent>

            <SpecialOffers>
                <motion.h2
                    animate={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -100 }}
                    transition={{ duration: 1 }}
                >
                    Special Offers
                </motion.h2>
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <div>
                        <h3>Buy More, Save More!</h3>
                        <p>Get 10% off when you buy 2 items, and 20% off when you buy 3 or more.</p>
                    </div>
                    <div>
                        <h3>Free Shipping</h3>
                        <p>Enjoy free shipping on orders over $500.</p>
                    </div>
                </motion.div>
            </SpecialOffers>
        </PageContainer>
    );
};

// Spinner component
const Spinner = () => (
    <SpinnerWrapper>
        <div className="spinner"></div>
    </SpinnerWrapper>
);

// Styled Components (remain unchanged)
const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #fff;

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

const PageContainer = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Header = styled(motion.div)`
    text-align: center;
    margin-bottom: 3rem;

    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.2rem;
        color: #555;
    }
`;

const FilterContainer = styled.div`
    margin-bottom: 2rem;
`;

const FilterScrollContainer = styled.div`
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    padding-bottom: 1rem;
`;

const FilterButton = styled(motion.button)`
    background-color: ${props => (props.active ? '#f39c12' : '#3498db')};
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.3s;

    &:focus {
        outline: none;
    }
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
`;

const ProductCard = styled(motion.div)`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-10px);
    }
`;

const ProductImage = styled.div`
    position: relative;

    img {
        width: 100%;
        height: auto;
        border-bottom: 2px solid #ddd;
    }
`;

const IconContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 15px;
    z-index: 2;
`;

const ProductInfo = styled.div`
    padding: 1rem;
    text-align: center;
`;

const Price = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    color: #3498db;
`;

const AddToCartButton = styled(motion.button)`
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;

    &:focus {
        outline: none;
    }
`;

const Toast = styled.div`
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #27ae60;
    color: white;
    padding: 10px 20px;
    border-radius: 30px;
    display: ${props => (props.show ? 'block' : 'none')};
    transition: 0.3s ease-out;
`;

const EducationalContent = styled.div`
    margin-top: 3rem;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    ul {
        list-style-type: disc;
        padding-left: 20px;
    }

    h2 {
        margin-bottom: 1rem;
    }
`;

const SpecialOffers = styled.div`
    margin-top: 3rem;
    padding: 2rem;
    background-color: #f3f3f3;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;
export default ShopPage;

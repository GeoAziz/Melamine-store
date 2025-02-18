import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1.5rem;
`;

const ProductPrice = styled.p`
  color: #ff6f61;
  font-size: 1.2rem;
`;

const ProductCard = ({ title, image, description }) => {
  return (
    <CardContainer>
      <ProductImage src={image} alt={title} />
      <ProductInfo>
        <ProductName>{title}</ProductName> {/* Dynamic title here */}
        <ProductPrice>{description}</ProductPrice> {/* Optional, depending on your design */}
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;

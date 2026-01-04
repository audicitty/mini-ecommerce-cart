import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, isInCart }) => {
  const isOutOfStock = product.stock === 0;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.thumbnail || product.images?.[0]} 
          alt={product.title}
          className="product-image"
        />
        <span className={`stock-badge ${isOutOfStock ? 'badge-danger' : 'badge-success'}`}>
          {isOutOfStock ? 'Out of Stock' : 'In Stock'}
        </span>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button 
            className={`btn btn-primary btn-add-cart ${isInCart ? 'in-cart' : ''}`}
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock || isInCart}
          >
            {isInCart ? '✓ In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

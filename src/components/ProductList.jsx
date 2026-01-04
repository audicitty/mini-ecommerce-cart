import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, onAddToCart, cart }) => {
    if (products.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h2>No Products Found</h2>
                <p>Try adjusting your filters or search terms</p>
            </div>
        );
    }

    return (
        <div className="product-list">
            {products.map(product => {
                const isInCart = cart.some(item => item.id === product.id);
                return (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        isInCart={isInCart}
                    />
                );
            })}
        </div>
    );
};

export default ProductList;

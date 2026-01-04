import React from 'react';
import './Cart.css';

const Cart = ({ cart, onUpdateQuantity, onRemoveFromCart }) => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cart.length === 0) {
        return (
            <div className="cart-container">
                <h2 className="cart-title">Shopping Cart</h2>
                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <p>Your cart is empty</p>
                    <span className="empty-cart-subtitle">Add some products to get started!</span>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2 className="cart-title">Shopping Cart ({totalItems} items)</h2>

            <div className="cart-items">
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <img
                            src={item.thumbnail || item.images?.[0]}
                            alt={item.title}
                            className="cart-item-image"
                        />

                        <div className="cart-item-details">
                            <h4 className="cart-item-title">{item.title}</h4>
                            <p className="cart-item-price">${item.price.toFixed(2)}</p>

                            <div className="cart-item-actions">
                                <div className="quantity-controls">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        −
                                    </button>
                                    <span className="quantity-display">{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                        disabled={item.quantity >= item.stock}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    className="btn-remove"
                                    onClick={() => onRemoveFromCart(item.id)}
                                    title="Remove from cart"
                                >
                                    🗑️
                                </button>
                            </div>

                            {item.quantity >= item.stock && (
                                <p className="stock-warning">Max stock reached</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <div className="summary-row">
                    <span>Total Items:</span>
                    <strong>{totalItems}</strong>
                </div>
                <div className="summary-row total">
                    <span>Total Price:</span>
                    <strong className="total-price">${totalPrice.toFixed(2)}</strong>
                </div>
            </div>
        </div>
    );
};

export default Cart;

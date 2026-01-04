import React, { useState, useEffect, useCallback } from 'react';
import ProductList from './components/ProductList';
import Filters from './components/Filters';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products?limit=20');
        const data = await response.json();
        setProducts(data.products);

        // Extract unique categories
        const uniqueCategories = [...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCategories);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Sort by price
    if (sortOrder === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, sortOrder]);

  // Cart operations
  const handleAddToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        // Item already in cart, don't add again
        return prevCart;
      }

      // Add new item with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const handleUpdateQuantity = useCallback((productId, newQuantity) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          // Ensure quantity doesn't exceed stock
          const validQuantity = Math.min(Math.max(1, newQuantity), item.stock);
          return { ...item, quantity: validQuantity };
        }
        return item;
      });
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortOrder('');
  }, []);

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">🛍️ Mini E-Commerce Store</h1>
          <p className="app-subtitle">Discover amazing products at great prices</p>
        </div>
      </header>

      <main className="container">
        <div className="app-layout">
          <div className="main-content">
            <Filters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
              onClearFilters={handleClearFilters}
              categories={categories}
            />

            <ProductList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              cart={cart}
            />
          </div>

          <aside className="sidebar">
            <Cart
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;

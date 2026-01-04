import React, { useState, useEffect } from 'react';
import './Filters.css';

const Filters = ({
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    sortOrder,
    onSortChange,
    onClearFilters,
    categories
}) => {
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchChange(debouncedSearch);
        }, 300);

        return () => clearTimeout(timer);
    }, [debouncedSearch, onSearchChange]);

    const hasActiveFilters = searchTerm || selectedCategory || sortOrder;

    return (
        <div className="filters-container">
            <div className="filters-row">
                <div className="filter-group">
                    <label htmlFor="search">Search Products</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search by name..."
                        value={debouncedSearch}
                        onChange={(e) => setDebouncedSearch(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="sort">Sort by Price</label>
                    <select
                        id="sort"
                        value={sortOrder}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Default</option>
                        <option value="low-high">Low → High</option>
                        <option value="high-low">High → Low</option>
                    </select>
                </div>

                {hasActiveFilters && (
                    <div className="filter-group filter-actions">
                        <button
                            onClick={onClearFilters}
                            className="btn btn-secondary clear-btn"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filters;

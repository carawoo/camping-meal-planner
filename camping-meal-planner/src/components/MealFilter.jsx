import { useState } from 'react';
import { categories, difficulties, priceRanges } from '../data/meals';

export default function MealFilter({ onFilterChange }) {
    const [filters, setFilters] = useState({
        category: 'all',
        difficulty: 'all',
        priceRange: 'all'
    });

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="meal-filter">
            <div className="filter-group">
                <label>카테고리</label>
                <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                    {Object.entries(categories).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>난이도</label>
                <select
                    value={filters.difficulty}
                    onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                >
                    {Object.entries(difficulties).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>가격대</label>
                <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                    {Object.entries(priceRanges).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

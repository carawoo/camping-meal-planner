import { useState } from 'react';

export default function MealSearch({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className="meal-search">
            <div className="search-input-wrapper">
                <input
                    type="text"
                    placeholder="메뉴 검색... (예: 떡볶이, 스테이크, 라면)"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                {searchTerm && (
                    <button onClick={clearSearch} className="clear-button">
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}

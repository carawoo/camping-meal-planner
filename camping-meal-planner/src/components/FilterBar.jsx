import { useState } from 'react';

export default function FilterBar({ onFilterChange }) {
    const [filters, setFilters] = useState({
        people: 'all',
        timeOfDay: 'all',
        difficulty: 'all',
        allergies: [],
        dietary: [],
        maxSpicy: 5
    });

    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const toggleAllergy = (allergen) => {
        const newAllergies = filters.allergies.includes(allergen)
            ? filters.allergies.filter(a => a !== allergen)
            : [...filters.allergies, allergen];
        handleFilterChange('allergies', newAllergies);
    };

    const toggleDietary = (diet) => {
        const newDietary = filters.dietary.includes(diet)
            ? filters.dietary.filter(d => d !== diet)
            : [...filters.dietary, diet];
        handleFilterChange('dietary', newDietary);
    };

    return (
        <div className="filter-bar-container">
            <div className="filter-bar">
                {/* People Filter */}
                <div className="filter-group">
                    <span className="filter-label">👥 인원</span>
                    <div className="filter-buttons">
                        {['all', '1-2', '3-4', '5+'].map(value => (
                            <button
                                key={value}
                                className={`filter-btn ${filters.people === value ? 'active' : ''}`}
                                onClick={() => handleFilterChange('people', value)}
                            >
                                {value === 'all' ? '전체' : value + '명'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Time of Day Filter */}
                <div className="filter-group">
                    <span className="filter-label">🕐 시간대</span>
                    <div className="filter-buttons">
                        {[
                            { value: 'all', label: '전체' },
                            { value: 'breakfast', label: '아침' },
                            { value: 'lunch', label: '점심' },
                            { value: 'dinner', label: '저녁' }
                        ].map(({ value, label }) => (
                            <button
                                key={value}
                                className={`filter-btn ${filters.timeOfDay === value ? 'active' : ''}`}
                                onClick={() => handleFilterChange('timeOfDay', value)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Difficulty Filter */}
                <div className="filter-group">
                    <span className="filter-label">⭐ 난이도</span>
                    <div className="filter-buttons">
                        {[
                            { value: 'all', label: '전체' },
                            { value: 'easy', label: '쉬움' },
                            { value: 'medium', label: '보통' },
                            { value: 'hard', label: '어려움' }
                        ].map(({ value, label }) => (
                            <button
                                key={value}
                                className={`filter-btn ${filters.difficulty === value ? 'active' : ''}`}
                                onClick={() => handleFilterChange('difficulty', value)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Advanced Filter Toggle */}
                <button
                    className="filter-advanced-toggle"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                >
                    {showAdvanced ? '간단히 ▲' : '상세필터 ▼'}
                </button>
            </div>

            {/* Advanced Filters */}
            {showAdvanced && (
                <div className="filter-advanced">
                    {/* Allergies */}
                    <div className="filter-group-advanced">
                        <span className="filter-label-advanced">⚠️ 알레르기 제외</span>
                        <div className="filter-chips">
                            {[
                                { value: 'seafood', label: '해산물' },
                                { value: 'nuts', label: '견과류' },
                                { value: 'dairy', label: '유제품' },
                                { value: 'gluten', label: '글루텐' },
                                { value: 'soy', label: '대두' },
                                { value: 'eggs', label: '계란' },
                                { value: 'shellfish', label: '조개류' }
                            ].map(({ value, label }) => (
                                <button
                                    key={value}
                                    className={`filter-chip ${filters.allergies.includes(value) ? 'active' : ''}`}
                                    onClick={() => toggleAllergy(value)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dietary */}
                    <div className="filter-group-advanced">
                        <span className="filter-label-advanced">🌱 식이 제한</span>
                        <div className="filter-chips">
                            {[
                                { value: 'vegetarian', label: '채식' },
                                { value: 'vegan', label: '비건' },
                                { value: 'halal', label: '할랄' }
                            ].map(({ value, label }) => (
                                <button
                                    key={value}
                                    className={`filter-chip ${filters.dietary.includes(value) ? 'active' : ''}`}
                                    onClick={() => toggleDietary(value)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Spicy Level */}
                    <div className="filter-group-advanced">
                        <span className="filter-label-advanced">🌶️ 최대 매운맛</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <input
                                type="range"
                                min="0"
                                max="5"
                                value={filters.maxSpicy}
                                onChange={(e) => handleFilterChange('maxSpicy', parseInt(e.target.value))}
                                className="spicy-range"
                            />
                            <span style={{ minWidth: '60px', fontSize: '0.875rem', color: 'var(--color-text)' }}>
                                {filters.maxSpicy === 0 ? '안매움' : `${filters.maxSpicy}/5`}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

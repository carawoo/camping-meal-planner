import { useState } from 'react';

export default function FilterBar({ onFilterChange }) {
    const [filters, setFilters] = useState({
        people: 'all',
        timeOfDay: 'all',
        difficulty: 'all',
        allergies: [],
        dietary: [],
        maxSpicy: 3  // 기본값 "보통"으로 변경
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

    const handleReset = () => {
        const initialFilters = {
            people: 'all',
            timeOfDay: 'all',
            difficulty: 'all',
            allergies: [],
            dietary: [],
            maxSpicy: 3  // 기본값 "보통"으로 변경
        };
        setFilters(initialFilters);
        onFilterChange(initialFilters);
    };

    return (
        <div className="filter-bar-container">
            <div className="filter-bar">
                {/* Advanced Filter Toggle - Outline Style */}
                <button
                    className="filter-advanced-toggle outline"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)',
                        fontWeight: '500'
                    }}
                >
                    {showAdvanced ? '필터 접기 ▲' : '상세필터 ▼'}
                </button>
            </div>

            {/* Advanced Filters */}
            {showAdvanced && (
                <div className="filter-advanced">
                    {/* People Filter */}
                    <div className="filter-group-advanced">
                        <span className="filter-label-advanced">👥 인원</span>
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
                    <div className="filter-group-advanced">
                        <span className="filter-label-advanced">🕐 시간대</span>
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
                    <div className="filter-group-advanced">
                        <span className="filter-label-advanced">⭐ 난이도</span>
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

                    {/* Spicy Level - 칩 버튼으로 변경 */}
                    <div className="filter-group-advanced">
                        <span className="filter-label-advanced">🌶️ 매운맛</span>
                        <div className="filter-chips">
                            {[
                                { value: 5, label: '전체', emoji: '🌟' },
                                { value: 1, label: '안맵게', emoji: '🥛' },
                                { value: 3, label: '보통', emoji: '🌶️' },
                                { value: 5, label: '맵게', emoji: '🔥' }
                            ].map(({ value, label, emoji }) => (
                                <button
                                    key={label}
                                    className={`filter-chip ${filters.maxSpicy === value ? 'active spicy-chip' : ''}`}
                                    onClick={() => handleFilterChange('maxSpicy', value)}
                                    style={{
                                        borderRadius: '999px',
                                        backgroundColor: filters.maxSpicy === value ? '#ef4444' : undefined
                                    }}
                                >
                                    {emoji} {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reset Button - 필터 내부로 이동 */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                        <button
                            className="filter-btn reset-btn"
                            onClick={handleReset}
                            style={{
                                background: 'var(--color-danger)',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                fontWeight: '600'
                            }}
                        >
                            🔄 초기화
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

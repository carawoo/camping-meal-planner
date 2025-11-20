import React, { useMemo } from 'react';
import { meals } from '../data/meals';

export default function Favorites({ favorites, onToggleFavorite, onNavigateHome }) {
    // Combine all meals into one array
    const allMeals = useMemo(() => {
        return [...meals.arrival, ...meals.dinner, ...meals.breakfast];
    }, []);

    // Filter meals based on favorites list
    const favoriteMeals = useMemo(() => {
        return allMeals.filter(meal => favorites.includes(meal.id));
    }, [allMeals, favorites]);

    // Helper to generate tags based on meal properties
    const getTags = (meal) => {
        const tags = [];
        // Main ingredient inference (simple logic for demo)
        if (meal.title.includes('고기') || meal.title.includes('삼겹') || meal.title.includes('스테이크')) tags.push('#고기');
        else if (meal.title.includes('새우') || meal.title.includes('해물') || meal.title.includes('조개')) tags.push('#해산물');
        else if (meal.title.includes('라면') || meal.title.includes('찌개') || meal.title.includes('탕')) tags.push('#국물요리');
        else tags.push('#간편요리');

        // Category
        if (meals.dinner.find(m => m.id === meal.id)) tags.push('#메인요리');
        else if (meals.breakfast.find(m => m.id === meal.id)) tags.push('#아침');
        else tags.push('#간식/안주');

        // Time
        tags.push(`#${meal.cookingTime}분이내`);

        return tags;
    };

    return (
        <div className="favorites-container">
            <header className="favorites-header">
                <h2>즐겨찾기</h2>
                <span className="favorites-count">{favoriteMeals.length}개의 레시피</span>
            </header>

            <div className="favorites-list">
                {favoriteMeals.map(meal => (
                    <div key={meal.id} className="favorite-item">
                        <div className="favorite-thumbnail">
                            <img src={meal.image} alt={meal.title} />
                        </div>

                        <div className="favorite-info">
                            <h3>{meal.title}</h3>
                            <div className="favorite-tags">
                                {getTags(meal).map((tag, index) => (
                                    <span key={index}>{tag}</span>
                                ))}
                            </div>
                        </div>

                        <button
                            className="favorite-delete-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(meal.id);
                            }}
                            aria-label="즐겨찾기 해제"
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>

            {favoriteMeals.length === 0 && (
                <div className="no-results">
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤍</div>
                    <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>아직 찜한 메뉴가 없어요</p>
                    <p className="hint" style={{ marginBottom: '24px' }}>마음에 드는 메뉴에 하트를 눌러보세요!</p>
                    <button
                        className="hero-btn hero-btn-primary"
                        onClick={onNavigateHome}
                    >
                        메뉴 구경하러 가기
                    </button>
                </div>
            )}
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { meals } from '../data/meals';

export default function Rankings({ onViewMeal }) {
    const [mealClicks, setMealClicks] = useState({});
    const [rankedMeals, setRankedMeals] = useState([]);

    useEffect(() => {
        // Load click data from localStorage
        const clicks = JSON.parse(localStorage.getItem('meal_clicks') || '{}');
        setMealClicks(clicks);

        // Get all meals and sort by clicks
        const allMeals = [];
        Object.values(meals).forEach(categoryMeals => {
            if (Array.isArray(categoryMeals)) {
                allMeals.push(...categoryMeals);
            }
        });

        // Sort by clicks (descending) and filter out hidden meals
        const sorted = allMeals
            .filter(meal => !meal.isHidden)
            .map(meal => ({
                ...meal,
                clicks: clicks[meal.id] || 0
            }))
            .sort((a, b) => b.clicks - a.clicks)
            .slice(0, 20); // Top 20

        setRankedMeals(sorted);
    }, []);

    const getRankBadge = (index) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return `${index + 1}위`;
    };

    return (
        <div className="rankings-container">
            <div className="rankings-header">
                <h1>📊 이번주 인기 랭킹</h1>
                <p className="rankings-subtitle">가장 많이 클릭된 캠핑 메뉴</p>
            </div>

            <div className="rankings-list">
                {rankedMeals.map((meal, index) => (
                    <div
                        key={meal.id}
                        className="ranking-item"
                        onClick={() => onViewMeal(meal)}
                    >
                        <div className="ranking-badge">
                            {getRankBadge(index)}
                        </div>
                        <div className="ranking-image">
                            <img src={meal.image} alt={meal.title} />
                        </div>
                        <div className="ranking-info">
                            <h3 className="ranking-title">{meal.title}</h3>
                            <div className="ranking-meta">
                                <span>⏱️ {meal.cookingTime}분</span>
                                <span>⭐ {meal.rating}</span>
                                <span>💰 ₩{meal.price?.toLocaleString()}</span>
                            </div>
                            <div className="ranking-stats">
                                <span className="click-count">👆 {meal.clicks || 0}회 조회</span>
                            </div>
                        </div>
                        <div className="ranking-arrow">→</div>
                    </div>
                ))}
            </div>

            {rankedMeals.length === 0 && (
                <div className="empty-rankings">
                    <p>아직 클릭 데이터가 없습니다.</p>
                    <p>메뉴를 둘러보고 인기 랭킹을 만들어보세요!</p>
                </div>
            )}
        </div>
    );
}

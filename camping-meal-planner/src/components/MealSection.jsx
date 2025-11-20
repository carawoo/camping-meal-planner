import React, { useState } from 'react';

export default function MealSection({ title, meals, layout = 'horizontal', onViewMeal, onSeeAll }) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!meals || meals.length === 0) return null;

    // Display limits per layout when not expanded
    const displayLimit = layout === 'horizontal' ? 10 : layout === 'list' ? 5 : 6;
    const displayMeals = isExpanded ? meals : meals.slice(0, displayLimit);
    const hasMore = meals.length > displayLimit;

    return (
        <div className="meal-section">
            <div className="section-header">
                <h2 className="section-title">{title}</h2>
                {hasMore && onSeeAll && (
                    <button
                        className="section-see-all"
                        onClick={onSeeAll}
                    >
                        전체보기 →
                    </button>
                )}
            </div>

            <div className={`section-content ${layout}`}>
                {layout === 'horizontal' ? (
                    <div className="horizontal-scroll">
                        {displayMeals.map((meal) => (
                            <div
                                key={meal.id}
                                className="meal-card-horizontal"
                                onClick={() => onViewMeal(meal)}
                            >
                                <div className="meal-card-image-horizontal">
                                    <img src={meal.image} alt={meal.title} />
                                </div>
                                <div className="meal-card-info-horizontal">
                                    <h3 className="meal-card-title-horizontal">{meal.title}</h3>
                                    <div className="meal-card-meta">
                                        <span className="meta-item">⏱️ {meal.cookingTime}분</span>
                                        <span className="meta-item">⭐ {meal.rating}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : layout === 'list' ? (
                    <div className="list-view">
                        {displayMeals.map((meal) => (
                            <div
                                key={meal.id}
                                className="meal-card-list"
                                onClick={() => onViewMeal(meal)}
                            >
                                <img src={meal.image} alt={meal.title} className="meal-thumbnail-list" />
                                <div className="meal-info-list">
                                    <h3 className="meal-title-list">{meal.title}</h3>
                                    <div className="meal-meta-list">
                                        <span>{meal.cookingTime}분</span>
                                        <span>⭐ {meal.rating}</span>
                                    </div>
                                </div>
                                <span className="arrow-icon">→</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid-view">
                        {displayMeals.map((meal) => (
                            <div
                                key={meal.id}
                                className="meal-card-grid"
                                onClick={() => onViewMeal(meal)}
                            >
                                <img src={meal.image} alt={meal.title} />
                                <h3>{meal.title}</h3>
                                <div className="meal-card-footer">
                                    <span>⏱️ {meal.cookingTime}분</span>
                                    <span>⭐ {meal.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

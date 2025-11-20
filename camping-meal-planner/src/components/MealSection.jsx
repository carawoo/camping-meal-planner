import React from 'react';

export default function MealSection({ title, meals, layout = 'horizontal', onViewMeal }) {
    if (!meals || meals.length === 0) return null;

    return (
        <div className="meal-section">
            <div className="section-header">
                <h2 className="section-title">{title}</h2>
                {meals.length > 6 && (
                    <button className="section-see-all">전체보기 →</button>
                )}
            </div>

            <div className={`section-content ${layout}`}>
                {layout === 'horizontal' ? (
                    <div className="horizontal-scroll">
                        {meals.slice(0, 10).map((meal) => (
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
                        {meals.slice(0, 5).map((meal) => (
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
                        {meals.slice(0, 6).map((meal) => (
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

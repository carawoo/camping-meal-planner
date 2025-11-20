import React from 'react';

export default function MealDetail({ meal, onClose, onBuy }) {
    if (!meal) return null;

    const handleBuy = (platform) => {
        const baseUrl = platform === 'coupang'
            ? 'https://www.coupang.com/np/search?component=&q='
            : 'https://search.shopping.naver.com/search/all?query=';

        const query = meal.searchQuery || meal.title;
        window.open(`${baseUrl}${encodeURIComponent(query)}`, '_blank');
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} style={{ color: i < rating ? '#FFB800' : '#444' }}>
                    ⭐
                </span>
            );
        }
        return stars;
    };

    const hasDetailedInfo = meal.ingredients || meal.seasonings || meal.reviews;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content meal-detail-modal" onClick={e => e.stopPropagation()}>
                {/* Header Image */}
                <div className="meal-detail-header">
                    <img src={meal.image} alt={meal.title} className="meal-detail-image" />
                    <button className="modal-close meal-detail-close" onClick={onClose}>×</button>
                </div>

                <div className="modal-body meal-detail-body">
                    {/* Title & Description */}
                    <h2 className="meal-detail-title">{meal.title}</h2>
                    <p className="meal-detail-description">{meal.description}</p>

                    {/* Quick Info Icons */}
                    <div className="meal-detail-info-icons">
                        <div className="info-icon-item">
                            <div className="info-icon">⏱️</div>
                            <div className="info-label">{meal.cookingTime}분</div>
                        </div>
                        <div className="info-icon-item">
                            <div className="info-icon">🔥</div>
                            <div className="info-label">{meal.difficulty || '쉬움'}</div>
                        </div>
                        <div className="info-icon-item">
                            <div className="info-icon">👥</div>
                            <div className="info-label">{meal.servings}인분</div>
                        </div>
                    </div>

                    {hasDetailedInfo ? (
                        <>
                            {/* Ingredients */}
                            {meal.ingredients && (
                                <div className="meal-detail-section">
                                    <h3 className="section-title">재료</h3>
                                    <div className="ingredient-list">
                                        {meal.ingredients.map((ing, idx) => (
                                            <div key={idx} className="ingredient-item">
                                                <span className="ingredient-icon">⚪</span>
                                                <span className="ingredient-name">{ing.name}</span>
                                                <span className="ingredient-amount">{ing.amount}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Seasonings */}
                            {meal.seasonings && (
                                <div className="meal-detail-section">
                                    <h3 className="section-title">양념</h3>
                                    <div className="ingredient-list">
                                        {meal.seasonings.map((season, idx) => (
                                            <div key={idx} className="ingredient-item">
                                                <span className="ingredient-icon">⚪</span>
                                                <span className="ingredient-name">{season.name}</span>
                                                <span className="ingredient-amount">{season.amount}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Reviews */}
                            {meal.reviews && (
                                <div className="meal-detail-section">
                                    <h3 className="section-title">사용자 리뷰 ({meal.reviews.length})</h3>
                                    <div className="review-list">
                                        {meal.reviews.map((review, idx) => (
                                            <div key={idx} className="review-item">
                                                <div className="review-header">
                                                    <div className="review-author">
                                                        <span className="author-emoji">{review.emoji}</span>
                                                        <span className="author-name">{review.author}</span>
                                                    </div>
                                                    <span className="review-date">{review.date}</span>
                                                </div>
                                                <div className="review-rating">
                                                    {renderStars(review.rating)}
                                                    <span className="rating-number">{review.rating.toFixed(1)}</span>
                                                </div>
                                                <p className="review-comment">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="no-detail-info">
                            <p>이 메뉴의 상세 정보가 아직 준비되지 않았습니다.</p>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="modal-footer meal-detail-footer">
                    <button
                        className="btn btn-outline"
                        onClick={() => handleBuy('coupang')}
                        style={{ flex: 1 }}
                    >
                        🚀 쿠팡에서 구매
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => handleBuy('naver')}
                        style={{ flex: 1 }}
                    >
                        💚 네이버 최저가
                    </button>
                </div>
            </div>
        </div>
    );
}

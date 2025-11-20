import { useState } from 'react';

export default function RecipeDetail({ isOpen, onClose, meal }) {
    const [activeTab, setActiveTab] = useState('ingredients');

    if (!isOpen || !meal) return null;

    const recipeData = {
        ingredients: meal.ingredients || [
            { name: '통삼겹살', amount: '600g' },
            { name: '소금', amount: '적당량' }
        ],
        seasonings: meal.seasonings || [
            { name: '쌈장', amount: '200g' }
        ],
        cookingSteps: meal.cookingSteps || [
            '1. 통삼겹살은 먹기 좋은 크기로 썰어 준비합니다.',
            '2. 그릴에 올려 노릇하게 구워줍니다.'
        ],
        storage: meal.storage || '냉장 보관',
        reviews: meal.reviews || [
            { id: 1, author: '캠퍼', rating: 5, date: '2주 전', text: '완전 대박!' }
        ],
        averageRating: 4.5,
        totalReviews: 23
    };

    const renderStars = (rating) => {
        return '⭐'.repeat(Math.floor(rating));
    };

    return (
        <div className="modal-overlay recipe-detail-overlay" onClick={onClose}>
            <div className="recipe-detail-content" onClick={e => e.stopPropagation()}>
                <div className="recipe-detail-header" style={{
                    backgroundImage: `url(${meal.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                    <div className="recipe-header-overlay">
                        <button className="recipe-close" onClick={onClose}>←</button>
                        <div className="recipe-actions">
                            <button className="recipe-action-btn">🔖</button>
                            <button className="recipe-action-btn">📤</button>
                        </div>
                    </div>
                </div>

                <div className="recipe-meta-section">
                    <h1 className="recipe-title">{meal.title}</h1>
                    <div className="recipe-meta-grid">
                        <div className="meta-item">
                            <div className="meta-icon">🔥</div>
                            <div className="meta-text">
                                <div className="meta-label">조리시간</div>
                                <div className="meta-value">{meal.cookingTime || 60}분</div>
                            </div>
                        </div>
                        <div className="meta-item">
                            <div className="meta-icon">⚡</div>
                            <div className="meta-text">
                                <div className="meta-label">난이도</div>
                                <div className="meta-value">쉬움</div>
                            </div>
                        </div>
                        <div className="meta-item">
                            <div className="meta-icon">👥</div>
                            <div className="meta-text">
                                <div className="meta-label">인분</div>
                                <div className="meta-value">2-3인분</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="recipe-tabs">
                    <button className={`recipe-tab ${activeTab === 'ingredients' ? 'active' : ''}`} onClick={() => setActiveTab('ingredients')}>재료</button>
                    <button className={`recipe-tab ${activeTab === 'cooking' ? 'active' : ''}`} onClick={() => setActiveTab('cooking')}>조리법</button>
                    <button className={`recipe-tab ${activeTab === 'storage' ? 'active' : ''}`} onClick={() => setActiveTab('storage')}>보관법</button>
                    <button className={`recipe-tab ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>리뷰</button>
                </div>

                <div className="recipe-tab-content">
                    {activeTab === 'ingredients' && (
                        <div className="ingredients-section">
                            <div className="ingredient-category">
                                <h3>주재료</h3>
                                {recipeData.ingredients.map((item, idx) => (
                                    <div key={idx} className="ingredient-item">
                                        <label className="ingredient-checkbox">
                                            <input type="checkbox" />
                                            <span className="checkbox-round"></span>
                                        </label>
                                        <span className="ingredient-name">{item.name}</span>
                                        <span className="ingredient-amount">{item.amount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'cooking' && (
                        <div className="cooking-section">
                            {recipeData.cookingSteps.map((step, idx) => (
                                <div key={idx} className="cooking-step">
                                    <div className="step-number">{idx + 1}</div>
                                    <div className="step-text">{step}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'storage' && (
                        <div className="storage-section">
                            <p>{recipeData.storage}</p>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="reviews-section">
                            <div className="reviews-header">
                                <h3>사용자 리뷰 ({recipeData.totalReviews})</h3>
                                <div className="average-rating">
                                    <span className="rating-number">{recipeData.averageRating}</span>
                                    <span className="rating-stars">{renderStars(recipeData.averageRating)}</span>
                                </div>
                            </div>
                            {recipeData.reviews.map(review => (
                                <div key={review.id} className="review-item">
                                    <div className="review-header">
                                        <div className="review-author">
                                            <div className="author-avatar">👤</div>
                                            <div className="author-info">
                                                <div className="author-name">{review.author}</div>
                                                <div className="review-stars">{renderStars(review.rating)}</div>
                                            </div>
                                        </div>
                                        <div className="review-date">{review.date}</div>
                                    </div>
                                    <p className="review-text">{review.text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

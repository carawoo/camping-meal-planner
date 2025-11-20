import React, { useState, useEffect } from 'react';

export default function MealDetail({ meal, onClose }) {
    const [userReviews, setUserReviews] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState({
        author: '',
        rating: 5,
        comment: '',
        emoji: '😊'
    });

    // Load user reviews from localStorage
    useEffect(() => {
        const savedReviews = localStorage.getItem(`reviews_${meal.id}`);
        if (savedReviews) {
            setUserReviews(JSON.parse(savedReviews));
        }
    }, [meal.id]);

    const handleSubmitReview = (e) => {
        e.preventDefault();

        const review = {
            ...newReview,
            author: newReview.author.trim() || '익명',
            date: '방금 전'
        };

        const updatedReviews = [review, ...userReviews];
        setUserReviews(updatedReviews);
        localStorage.setItem(`reviews_${meal.id}`, JSON.stringify(updatedReviews));

        // Reset form
        setNewReview({
            author: '',
            rating: 5,
            comment: '',
            emoji: '😊'
        });
        setShowReviewForm(false);
    };

    const allReviews = [...userReviews, ...(meal.reviews || [])];

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

                            {/* Reviews Section */}
                            {allReviews.length > 0 && (
                                <div className="meal-detail-section">
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <h3>사용자 리뷰 ({allReviews.length})</h3>
                                        <button
                                            className="btn-write-review"
                                            onClick={() => setShowReviewForm(!showReviewForm)}
                                        >
                                            {showReviewForm ? '취소' : '✍️ 리뷰 작성'}
                                        </button>
                                    </div>

                                    {/* Review Form */}
                                    {showReviewForm && (
                                        <form className="review-form" onSubmit={handleSubmitReview}>
                                            <div className="form-row">
                                                <input
                                                    type="text"
                                                    placeholder="닉네임 (선택사항, 미입력 시 익명)"
                                                    value={newReview.author}
                                                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                                                    className="form-input"
                                                    maxLength={20}
                                                />
                                            </div>
                                            <div className="form-row">
                                                <label>평점:</label>
                                                <div className="rating-input">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <span
                                                            key={star}
                                                            className={`star ${star <= newReview.rating ? 'active' : ''}`}
                                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                                        >
                                                            ⭐
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <label>이모지:</label>
                                                <div className="emoji-picker">
                                                    {['😊', '🤤', '👍', '❤️', '🔥', '💯', '🏕️', '👨‍🍳'].map(emoji => (
                                                        <span
                                                            key={emoji}
                                                            className={`emoji-option ${newReview.emoji === emoji ? 'active' : ''}`}
                                                            onClick={() => setNewReview({ ...newReview, emoji })}
                                                        >
                                                            {emoji}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <textarea
                                                    placeholder="캠핑에서 이 메뉴를 해먹은 후기를 남겨주세요!"
                                                    value={newReview.comment}
                                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                                    className="form-textarea"
                                                    maxLength={200}
                                                    required
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                리뷰 등록
                                            </button>
                                        </form>
                                    )}

                                    {/* Reviews List */}
                                    <div className="reviews-list">
                                        {allReviews.map((review, index) => (
                                            <div key={index} className="review-item">
                                                <div className="review-header">
                                                    <div className="review-author">
                                                        <span className="author-emoji">{review.emoji}</span>
                                                        <span className="author-name">{review.author}</span>
                                                    </div>
                                                    <div className="review-meta">
                                                        <span className="review-rating">
                                                            {'⭐'.repeat(review.rating)} {review.rating}.0
                                                        </span>
                                                        <span className="review-date">{review.date}</span>
                                                    </div>
                                                </div>
                                                <p className="review-comment">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Empty State for Reviews */}
                            {allReviews.length === 0 && (
                                <div className="meal-detail-section">
                                    <h3>사용자 리뷰</h3>
                                    <div className="empty-reviews">
                                        <p>아직 리뷰가 없습니다.</p>
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => setShowReviewForm(true)}
                                        >
                                            ✍️ 첫 리뷰 작성하기
                                        </button>
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

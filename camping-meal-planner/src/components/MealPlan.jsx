import { useState, useEffect } from 'react';

export default function MealPlan({ isOpen, onClose, plan, onSave }) {
    const [isSaved, setIsSaved] = useState(false);

    // Check if this plan is already saved
    useEffect(() => {
        if (!plan) return;

        const savedPlans = localStorage.getItem('camping_plans');
        if (savedPlans) {
            const plans = JSON.parse(savedPlans);
            // Check if a similar plan exists (same duration, style, and schedule length)
            const exists = plans.some(p =>
                p.duration === plan.duration &&
                p.style === plan.style &&
                p.schedule.length === plan.schedule.length
            );
            setIsSaved(exists);
        }
    }, [plan]);

    if (!isOpen) return null;

    const getMealTime = (mealType) => {
        switch (mealType) {
            case 'lunch': return '12:00';
            case 'dinner': return '18:00';
            case 'breakfast': return '08:00';
            default: return '12:00';
        }
    };

    const getMealIcon = (mealType) => {
        switch (mealType) {
            case 'lunch': return '🌤️';
            case 'dinner': return '🌙';
            case 'breakfast': return '☀️';
            default: return '🍽️';
        }
    };

    const getMealLabel = (mealType) => {
        switch (mealType) {
            case 'lunch': return '점심';
            case 'dinner': return '저녁';
            case 'breakfast': return '아침';
            default: return '식사';
        }
    };

    const getDayLabel = (dayIndex) => {
        const days = ['금요일', '토요일', '일요일'];
        return days[dayIndex] || `Day ${dayIndex + 1}`;
    };

    const handleBuy = (meal, platform) => {
        const baseUrl = platform === 'coupang'
            ? 'https://www.coupang.com/np/search?component=&q='
            : 'https://search.shopping.naver.com/search/all?query=';

        const query = meal.searchQuery || meal.title;
        window.open(`${baseUrl}${encodeURIComponent(query)}`, '_blank');
    };

    const handleSave = () => {
        if (isSaved) {
            alert('이미 저장된 식단 계획입니다!');
            return;
        }

        const name = prompt('식단표 이름을 입력해주세요:', `${plan.duration} ${plan.style} 식단`);
        if (name) {
            onSave(name, plan);
            setIsSaved(true);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content meal-plan-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>📅 내 캠핑 식단 계획</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    {/* Plan Summary */}
                    <div className="plan-summary">
                        <div className="summary-item">
                            <span className="summary-label">기간</span>
                            <span className="summary-value">{plan.duration}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">스타일</span>
                            <span className="summary-value">{plan.style}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">총 끼니</span>
                            <span className="summary-value">{plan.schedule.reduce((sum, day) => sum + day.meals.length, 0)}끼</span>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="meal-timeline">
                        {plan.schedule.map((day, dayIndex) => (
                            <div key={dayIndex} className="timeline-day">
                                <div className="day-header">
                                    <span className="day-badge">Day {dayIndex + 1}</span>
                                    <span className="day-name">{getDayLabel(dayIndex)}</span>
                                </div>

                                <div className="day-meals">
                                    {day.meals.map((meal, mealIndex) => (
                                        <div key={mealIndex} className="timeline-meal">
                                            <div className="meal-time-marker">
                                                <div className="time-dot"></div>
                                                <div className="time-line"></div>
                                            </div>

                                            <div className="meal-content">
                                                <div className="meal-time-label">
                                                    <span className="meal-icon">{getMealIcon(meal.type)}</span>
                                                    <span className="meal-type">{getMealLabel(meal.type)}</span>
                                                    <span className="meal-time">{getMealTime(meal.type)}</span>
                                                </div>

                                                <div className="meal-card-timeline">
                                                    {meal.item.isCustom ? (
                                                        <div className="timeline-meal-info">
                                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                                <span className="meal-emoji">{meal.item.emoji}</span>
                                                                <span className="meal-title">{meal.item.title}</span>
                                                            </div>
                                                            <div className="timeline-meal-actions">
                                                                <button
                                                                    className="btn-timeline-buy btn-outline"
                                                                    onClick={() => handleBuy(meal.item, 'coupang')}
                                                                >
                                                                    🚀 쿠팡 검색
                                                                </button>
                                                                <button
                                                                    className="btn-timeline-buy btn-outline"
                                                                    onClick={() => handleBuy(meal.item, 'naver')}
                                                                >
                                                                    💚 네이버 검색
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <img src={meal.item.image} alt={meal.item.title} className="timeline-meal-image" />
                                                            <div className="timeline-meal-info">
                                                                <div className="timeline-meal-title">{meal.item.title}</div>
                                                                <div className="timeline-meal-meta">
                                                                    ₩{meal.item.price?.toLocaleString()} • {meal.item.cookingTime}분
                                                                </div>
                                                                <div className="timeline-meal-actions">
                                                                    <button
                                                                        className="btn-timeline-buy btn-outline"
                                                                        onClick={() => handleBuy(meal.item, 'coupang')}
                                                                    >
                                                                        🚀 쿠팡 구매
                                                                    </button>
                                                                    <button
                                                                        className="btn-timeline-buy btn-outline"
                                                                        onClick={() => handleBuy(meal.item, 'naver')}
                                                                    >
                                                                        💚 네이버 최저가
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-outline" onClick={onClose}>
                        닫기
                    </button>
                    <button
                        className={`btn ${isSaved ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={handleSave}
                    >
                        {isSaved ? '✓ 저장됨' : '계획 저장'}
                    </button>
                </div>
            </div>
        </div>
    );
}

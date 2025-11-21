import { useState } from 'react';
import ShoppingList from './ShoppingList';

export default function SavedPlans({ isOpen, onClose, savedPlans, onDeletePlan, onRenamePlan, inlineMode = false, onOpenWizard }) {
    const [expandedPlan, setExpandedPlan] = useState(null);
    const [activeView, setActiveView] = useState('plans'); // 'plans' or 'shopping'
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [editingPlanId, setEditingPlanId] = useState(null);
    const [editingName, setEditingName] = useState('');

    if (!isOpen && !inlineMode) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getDurationText = (duration) => {
        const map = {
            '1night': '1박2일',
            '2nights': '2박3일',
            '3nights': '3박4일'
        };
        return map[duration] || duration;
    };

    const getPeopleText = (people) => {
        const map = {
            '1-2': '1-2명',
            '3-4': '3-4명',
            '5+': '5명 이상'
        };
        return map[people] || people;
    };

    const getArrivalTimeText = (arrivalTime) => {
        const map = {
            'lunch-before': '점심 전 (~12시)',
            'lunch-after': '점심 후 (12~17시)',
            'dinner': '저녁 (17시~)'
        };
        return map[arrivalTime] || arrivalTime;
    };

    const getMealTypeLabel = (mealType) => {
        const map = {
            'breakfast': '아침',
            'lunch': '점심',
            'dinner': '저녁'
        };
        return map[mealType] || mealType;
    };

    const handleStartEdit = (plan) => {
        setEditingPlanId(plan.id);
        setEditingName(plan.name);
    };

    const handleSaveEdit = (planId) => {
        if (editingName.trim() && onRenamePlan) {
            onRenamePlan(planId, editingName.trim());
        }
        setEditingPlanId(null);
        setEditingName('');
    };

    const handleCancelEdit = () => {
        setEditingPlanId(null);
        setEditingName('');
    };

    // Get first plan for shopping list
    const firstPlan = savedPlans.length > 0 ? savedPlans[0] : null;
    const planForShopping = selectedPlan || firstPlan;

    const getDateRange = (plan) => {
        if (!plan) return '';
        const date = new Date(plan.createdAt);
        const endDate = new Date(date);
        if (plan.duration?.includes('1박')) {
            endDate.setDate(date.getDate() + 2);
        } else if (plan.duration?.includes('2박')) {
            endDate.setDate(date.getDate() + 3);
        }
        return `${date.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })} ~${endDate.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })} `;
    };

    const containerClass = inlineMode ? 'saved-plans-inline' : 'modal-overlay';
    const contentClass = inlineMode ? 'saved-plans-content' : 'modal-content saved-plans-modal';

    const content = (
        <div className={contentClass} onClick={inlineMode ? undefined : (e) => e.stopPropagation()}>
            <div className="modal-header">
                <h2>📋 {inlineMode ? '나의 캠핑 식단' : '저장된 플랜'}</h2>
                {!inlineMode && <button className="modal-close" onClick={onClose}>×</button>}
            </div>

            {!inlineMode && (
                <div className="saved-plans-tabs">
                    <button
                        className={`tab - button ${activeView === 'plans' ? 'active' : ''} `}
                        onClick={() => setActiveView('plans')}
                    >
                        식단 계획
                    </button>
                    <button
                        className={`tab - button ${activeView === 'shopping' ? 'active' : ''} `}
                        onClick={() => setActiveView('shopping')}
                    >
                        장보기 목록
                    </button>
                </div>
            )}

            <div className="modal-body">
                {activeView === 'shopping' ? (
                    planForShopping ? (
                        <ShoppingList
                            planId={planForShopping.id}
                            planName={planForShopping.name}
                            dateRange={getDateRange(planForShopping)}
                        />
                    ) : (
                        <div className="empty-feed">
                            <p>저장된 플랜이 없어 장보기 목록을 만들 수 없습니다.</p>
                            <p className="hint">먼저 식단 계획을 생성해주세요!</p>
                        </div>
                    )
                ) : savedPlans.length === 0 ? (
                    <div className="no-results" style={{ padding: '60px 20px', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                        <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>아직 저장된 식단표가 없어요</p>
                        <p className="hint" style={{ marginBottom: '24px' }}>AI 추천으로 나만의 식단을 만들어보세요!</p>
                        {onOpenWizard && (
                            <button
                                className="hero-btn hero-btn-primary"
                                onClick={() => {
                                    if (!inlineMode && onClose) onClose();
                                    onOpenWizard();
                                }}
                                style={{ padding: '14px 28px', fontSize: '16px' }}
                            >
                                ✨ 맞춤 추천 받기
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="saved-plans-grid">
                        {savedPlans.filter(plan => typeof plan.name === 'string').map(plan => (
                            <div key={plan.id} className="saved-plan-card">
                                <div className="plan-header">
                                    {editingPlanId === plan.id ? (
                                        <>
                                            <input
                                                type="text"
                                                className="plan-name-input"
                                                value={editingName}
                                                onChange={(e) => setEditingName(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleSaveEdit(plan.id);
                                                    } else if (e.key === 'Escape') {
                                                        handleCancelEdit();
                                                    }
                                                }}
                                                onBlur={() => handleSaveEdit(plan.id)}
                                                autoFocus
                                            />
                                            <button
                                                className="plan-edit-btn"
                                                onClick={() => handleSaveEdit(plan.id)}
                                                title="저장"
                                            >
                                                ✓
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="plan-name">{plan.name}</h3>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    className="plan-edit-btn"
                                                    onClick={() => handleStartEdit(plan)}
                                                    title="이름 수정"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    className="plan-delete-btn"
                                                    onClick={() => {
                                                        if (window.confirm(`"${plan.name}" 플랜을 삭제하시겠습니까 ? `)) {
                                                            onDeletePlan(plan.id);
                                                        }
                                                    }}
                                                    title="삭제"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="plan-meta">
                                    <span className="plan-date">📅 {formatDate(plan.createdAt)}</span>
                                </div>

                                <div className="plan-details">
                                    {plan.tripPlan ? (
                                        <>
                                            <div className="plan-detail-item">
                                                <span className="detail-label">여행 기간</span>
                                                <span className="detail-value">{getDurationText(plan.tripPlan.duration)}</span>
                                            </div>
                                            <div className="plan-detail-item">
                                                <span className="detail-label">인원</span>
                                                <span className="detail-value">{getPeopleText(plan.tripPlan.people)}</span>
                                            </div>
                                            <div className="plan-detail-item">
                                                <span className="detail-label">도착 시간</span>
                                                <span className="detail-value">{getArrivalTimeText(plan.tripPlan.arrivalTime)}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="plan-detail-item">
                                                <span className="detail-label">여행 기간</span>
                                                <span className="detail-value">{plan.duration || '-'}</span>
                                            </div>
                                            <div className="plan-detail-item">
                                                <span className="detail-label">캠핑 스타일</span>
                                                <span className="detail-value">{plan.style || '-'}</span>
                                            </div>
                                            <div className="plan-detail-item">
                                                <span className="detail-label">총 끼니</span>
                                                <span className="detail-value">
                                                    {plan.schedule ? `${plan.schedule.reduce((sum, day) => sum + day.meals.length, 0)} 끼` : '-'}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <button
                                    className="plan-expand-btn"
                                    onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                                >
                                    {expandedPlan === plan.id ? '▲ 접기' : '▼ 메뉴 보기'}
                                </button>

                                {expandedPlan === plan.id && (
                                    <div className="plan-meals">
                                        {plan.schedule ? (
                                            plan.schedule.map((day, idx) => (
                                                <div key={idx} className="plan-day">
                                                    <h4 className="day-title">Day {day.day || idx + 1}</h4>
                                                    {day.meals.map((meal, mealIdx) => (
                                                        <div key={mealIdx} className="plan-meal-item">
                                                            <span className="meal-time">{getMealTypeLabel(meal.type)}</span>
                                                            {meal.item?.image && (
                                                                <div className="meal-image-small">
                                                                    <img src={meal.item.image} alt={meal.item.title} />
                                                                </div>
                                                            )}
                                                            <span className="meal-name">{meal.item?.title || meal.name || '-'}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))
                                        ) : plan.meals ? (
                                            Object.entries(plan.meals).map(([day, dayMeals]) => (
                                                <div key={day} className="plan-day">
                                                    <h4 className="day-title">{day}</h4>
                                                    {dayMeals.map((meal, idx) => (
                                                        <div key={idx} className="plan-meal-item">
                                                            <span className="meal-time">{meal.time}</span>
                                                            <span className="meal-name">{meal.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="hint">메뉴 정보가 없습니다.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    if (inlineMode) {
        return content;
    }

    return (
        <div className={containerClass} onClick={onClose}>
            {content}
        </div>
    );
}

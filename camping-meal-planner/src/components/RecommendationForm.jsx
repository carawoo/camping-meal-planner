import { useState } from 'react';
import { meals } from '../data/meals';

const EMOJI_OPTIONS = ['😊', '🏕️', '⛺', '🔥', '🌲', '⭐', '🍖', '👨‍🍳', '🔰', '💪'];

// Food emoji mapping for custom meals
const FOOD_EMOJIS = {
    '라면': '🍜', '김치': '🥬', '치킨': '🍗', '피자': '🍕', '햄버거': '🍔',
    '스테이크': '🥩', '소시지': '🌭', '샌드위치': '🥪', '타코': '🌮', '부리또': '🌯',
    '파스타': '🍝', '카레': '🍛', '초밥': '🍣', '떡볶이': '🍢', '만두': '🥟',
    '빵': '🍞', '크루아상': '🥐', '베이글': '🥯', '와플': '🧇', '팬케이크': '🥞',
    '샐러드': '🥗', '수프': '🍲', '찌개': '🍲', '스프': '🥣', '죽': '🥣',
    '과일': '🍎', '야채': '🥬', '고기': '🍖', '생선': '🐟', '새우': '🍤',
    '치즈': '🧀', '계란': '🥚', '우유': '🥛', '커피': '☕', '차': '🍵'
};

function getFoodEmoji(text) {
    const normalized = text.toLowerCase();
    for (const [key, emoji] of Object.entries(FOOD_EMOJIS)) {
        if (normalized.includes(key)) return emoji;
    }
    return '🍽️'; // default food emoji
}

export default function RecommendationForm({ isOpen, onClose, onSubmit }) {
    const [step, setStep] = useState(1); // 1: select meals, 2: enter details
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [customMealInput, setCustomMealInput] = useState('');
    const [formData, setFormData] = useState({
        author: '',
        authorEmoji: '😊',
        title: '',
        description: ''
    });

    // Combine all meals
    const allMeals = [...meals.arrival, ...meals.dinner, ...meals.breakfast];

    if (!isOpen) return null;

    const handleToggleMeal = (meal) => {
        setSelectedMeals(prev => {
            const isSelected = prev.some(m => m.id === meal.id);
            if (isSelected) {
                return prev.filter(m => m.id !== meal.id);
            } else {
                return [...prev, meal];
            }
        });
    };

    const handleAddCustomMeal = () => {
        if (!customMealInput.trim()) return;

        const customMeal = {
            id: `custom-${Date.now()}`,
            title: customMealInput.trim(),
            emoji: getFoodEmoji(customMealInput),
            isCustom: true
        };

        setSelectedMeals(prev => [...prev, customMeal]);
        setCustomMealInput('');
    };

    const handleRemoveMeal = (mealId) => {
        setSelectedMeals(prev => prev.filter(m => m.id !== mealId));
    };

    const handleNextStep = () => {
        if (selectedMeals.length === 0) {
            alert('최소 1개 이상의 메뉴를 선택해주세요!');
            return;
        }
        setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.author.trim() || !formData.title.trim() || !formData.description.trim()) {
            alert('모든 항목을 입력해주세요!');
            return;
        }

        onSubmit({
            ...formData,
            mealNames: selectedMeals.map(m => m.title),
            meals: selectedMeals
        });

        // Reset
        setStep(1);
        setSelectedMeals([]);
        setFormData({
            author: '',
            authorEmoji: '😊',
            title: '',
            description: ''
        });

        onClose();
    };

    const handleClose = () => {
        setStep(1);
        setSelectedMeals([]);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content recommendation-form-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{step === 1 ? '메뉴 선택' : '추천 등록하기'}</h2>
                    <button className="modal-close" onClick={handleClose}>×</button>
                </div>

                {step === 1 ? (
                    // Step 1: Select Meals
                    <>
                        <div className="modal-body">
                            {/* Selected Count */}
                            <div style={{ marginBottom: '16px' }}>
                                <p style={{
                                    fontSize: '0.9375rem',
                                    color: 'var(--color-text)',
                                    fontWeight: 500
                                }}>
                                    선택된 메뉴: <strong>{selectedMeals.length}개</strong>
                                </p>
                                {selectedMeals.length > 0 && (
                                    <div className="selected-meals-preview" style={{ marginTop: '8px' }}>
                                        {selectedMeals.map(meal => (
                                            <span key={meal.id} className="preview-meal-tag">
                                                {meal.isCustom ? meal.emoji : ''} {meal.title}
                                                <button
                                                    onClick={() => handleRemoveMeal(meal.id)}
                                                    style={{
                                                        marginLeft: '6px',
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        color: 'var(--color-text-secondary)',
                                                        fontSize: '0.875rem'
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Custom Meal Input */}
                            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--color-border)' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    marginBottom: '8px',
                                    fontWeight: 500
                                }}>
                                    원하는 메뉴가 없나요?
                                </label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="text"
                                        className="combo-input"
                                        placeholder="메뉴 이름 입력 (예: 삼겹살)"
                                        value={customMealInput}
                                        onChange={(e) => setCustomMealInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddCustomMeal()}
                                        style={{ flex: 1 }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline"
                                        onClick={handleAddCustomMeal}
                                        style={{ padding: '12px 20px', fontSize: '0.875rem' }}
                                    >
                                        추가
                                    </button>
                                </div>
                            </div>

                            {/* Meal Grid */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    marginBottom: '12px',
                                    fontWeight: 500
                                }}>
                                    메뉴 목록에서 선택
                                </label>
                                <div className="meal-selection-grid">
                                    {allMeals.map(meal => (
                                        <button
                                            key={meal.id}
                                            type="button"
                                            className={`meal-selection-item ${selectedMeals.some(m => m.id === meal.id) ? 'selected' : ''}`}
                                            onClick={() => handleToggleMeal(meal)}
                                        >
                                            {selectedMeals.some(m => m.id === meal.id) && (
                                                <span className="selection-check">✓</span>
                                            )}
                                            <img src={meal.image} alt={meal.title} />
                                            <span className="meal-selection-title">{meal.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline" onClick={handleClose}>
                                취소
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                                다음 →
                            </button>
                        </div>
                    </>
                ) : (
                    // Step 2: Enter Details
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {/* Selected Meals Preview */}
                            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--color-border)' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    marginBottom: '8px',
                                    fontWeight: 500
                                }}>
                                    선택된 메뉴 ({selectedMeals.length}개)
                                </label>
                                <div className="selected-meals-preview">
                                    {selectedMeals.map(meal => (
                                        <span key={meal.id} className="preview-meal-tag">
                                            {meal.isCustom ? meal.emoji : ''} {meal.title}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    style={{
                                        marginTop: '8px',
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--color-text-secondary)',
                                        fontSize: '0.8125rem',
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    ← 메뉴 다시 선택
                                </button>
                            </div>

                            {/* Author Name & Emoji */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    marginBottom: '8px',
                                    fontWeight: 500
                                }}>
                                    닉네임 *
                                </label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <select
                                        className="emoji-select"
                                        value={formData.authorEmoji}
                                        onChange={(e) => setFormData({ ...formData, authorEmoji: e.target.value })}
                                    >
                                        {EMOJI_OPTIONS.map(emoji => (
                                            <option key={emoji} value={emoji}>{emoji}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        className="combo-input"
                                        placeholder="닉네임을 입력하세요"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        maxLength={20}
                                    />
                                </div>
                            </div>

                            {/* Title */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    marginBottom: '8px',
                                    fontWeight: 500
                                }}>
                                    제목 *
                                </label>
                                <input
                                    type="text"
                                    className="combo-input"
                                    placeholder="예: 가족 캠핑 단골 세트"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    maxLength={50}
                                />
                            </div>

                            {/* Description */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    marginBottom: '8px',
                                    fontWeight: 500
                                }}>
                                    추천 이유 *
                                </label>
                                <textarea
                                    className="combo-input"
                                    placeholder="이 조합을 추천하는 이유를 자유롭게 작성해주세요!"
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    maxLength={200}
                                />
                                <div style={{
                                    textAlign: 'right',
                                    fontSize: '0.75rem',
                                    color: 'var(--color-text-light)',
                                    marginTop: '4px'
                                }}>
                                    {formData.description.length}/200
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                                ← 이전
                            </button>
                            <button type="submit" className="btn btn-primary">
                                등록하기
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

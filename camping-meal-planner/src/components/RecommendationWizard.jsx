import { useState } from 'react';
import { meals } from '../data/meals';

export default function RecommendationWizard({ isOpen, onClose, onRecommend }) {
    const [preferences, setPreferences] = useState({
        campingStyle: '',
        duration: '',
        location: '',
        foodStyle: [],
        allergies: [],
        dietary: [],
        maxSpicy: 3
    });

    if (!isOpen) return null;

    const handleSelect = (key, value) => {
        if (key === 'foodStyle' || key === 'allergies' || key === 'dietary') {
            setPreferences(prev => ({
                ...prev,
                [key]: prev[key].includes(value)
                    ? prev[key].filter(v => v !== value)
                    : [...prev[key], value]
            }));
        } else {
            setPreferences(prev => ({ ...prev, [key]: value }));
        }
    };

    const getRecommendations = () => {
        const allMeals = [...meals.arrival, ...meals.dinner, ...meals.breakfast];
        let filtered = allMeals.filter(meal => {
            if (meal.isHidden) return false;

            // 알코올 음료 제외 (식사가 아님)
            if (meal.tags?.includes('alcohol') || meal.tags?.includes('drink')) {
                return false;
            }

            // Filter by allergies
            if (preferences.allergies.length > 0) {
                const hasAllergen = meal.allergens?.some(allergen =>
                    preferences.allergies.includes(allergen)
                );
                if (hasAllergen) return false;
            }

            // Filter by dietary preferences
            if (preferences.dietary.length > 0) {
                const matchesDiet = preferences.dietary.every(diet =>
                    meal.dietary?.includes(diet)
                );
                if (!matchesDiet) return false;
            }

            // Filter by spicy level
            if (meal.spicyLevel && meal.spicyLevel > preferences.maxSpicy) {
                return false;
            }

            // Filter by camping style
            if (preferences.campingStyle === 'car') {
                return meal.cookingTime <= 20 && !['seafood', 'bbq'].some(tag => meal.tags?.includes(tag));
            } else if (preferences.campingStyle === 'backpacking') {
                return meal.difficulty === 'easy' && meal.cookingTime <= 15;
            }
            return true;
        });

        if (preferences.foodStyle.length > 0) {
            filtered = filtered.filter(meal => {
                if (preferences.foodStyle.includes('korean') && meal.category === 'korean') return true;
                if (preferences.foodStyle.includes('western') && meal.category === 'western') return true;
                if (preferences.foodStyle.includes('simple') &&
                    (meal.category === 'simple' || meal.difficulty === 'easy')) return true;
                return false;
            });
        }

        if (preferences.location === 'coast') {
            filtered.sort((a, b) => {
                const aSeafood = a.tags?.includes('seafood') ? -1 : 0;
                const bSeafood = b.tags?.includes('seafood') ? -1 : 0;
                return aSeafood - bSeafood;
            });
        } else if (preferences.location === 'mountain') {
            filtered.sort((a, b) => {
                const aWarm = (a.tags?.includes('bbq') || a.tags?.includes('hot')) ? -1 : 0;
                const bWarm = (b.tags?.includes('bbq') || b.tags?.includes('hot')) ? -1 : 0;
                return aWarm - bWarm;
            });
        }

        // Build schedule based on duration
        const schedule = [];

        if (preferences.duration === 'day') {
            // 당일: 점심, 저녁
            schedule.push({
                day: 1,
                meals: [
                    { type: 'lunch', item: filtered[0] || allMeals[0] },
                    { type: 'dinner', item: filtered[1] || allMeals[1] }
                ]
            });
        } else if (preferences.duration === '1night') {
            // 1박2일: 3끼 (점심 시작 or 저녁 시작)
            // Randomly choose start time (50/50) or could be user input later
            const startWithLunch = Math.random() > 0.5;

            if (startWithLunch) {
                // Case A: 점심 -> 저녁 -> 다음날 아침
                schedule.push({
                    day: 1,
                    meals: [
                        { type: 'lunch', item: filtered[0] || allMeals[0] },
                        { type: 'dinner', item: filtered[1] || allMeals[1] }
                    ]
                });
                schedule.push({
                    day: 2,
                    meals: [
                        { type: 'breakfast', item: filtered[2] || allMeals[2] }
                    ]
                });
            } else {
                // Case B: 저녁 -> 다음날 아침 -> 다음날 점심
                schedule.push({
                    day: 1,
                    meals: [
                        { type: 'dinner', item: filtered[0] || allMeals[0] }
                    ]
                });
                schedule.push({
                    day: 2,
                    meals: [
                        { type: 'breakfast', item: filtered[1] || allMeals[1] },
                        { type: 'lunch', item: filtered[2] || allMeals[2] }
                    ]
                });
            }
        } else if (preferences.duration === '2nights') {
            // 2박3일: Day1(저녁), Day2(아침,점심,저녁), Day3(아침) -> Total 5 meals
            // Day 2에 육류/BBQ 메뉴 우선 배치

            // BBQ/육류 메뉴와 일반 메뉴 분리
            const bbqMeals = filtered.filter(m => m.tags?.includes('bbq') || m.tags?.includes('meat'));
            const otherMeals = filtered.filter(m => !m.tags?.includes('bbq') && !m.tags?.includes('meat'));

            // Day 1: 가벼운 저녁 (도착 첫날)
            schedule.push({
                day: 1,
                meals: [
                    { type: 'dinner', item: otherMeals[0] || filtered[0] || allMeals[0] }
                ]
            });

            // Day 2: 아침(간단), 점심(육류), 저녁(육류)
            schedule.push({
                day: 2,
                meals: [
                    { type: 'breakfast', item: otherMeals[1] || filtered[1] || allMeals[1] },
                    { type: 'lunch', item: bbqMeals[0] || filtered[2] || allMeals[2] },
                    { type: 'dinner', item: bbqMeals[1] || filtered[3] || allMeals[3] }
                ]
            });

            // Day 3: 간단한 아침
            schedule.push({
                day: 3,
                meals: [
                    { type: 'breakfast', item: otherMeals[2] || filtered[4] || allMeals[4] }
                ]
            });
        }

        return {
            duration: preferences.duration === 'day' ? '당일' :
                preferences.duration === '1night' ? '1박 2일' : '2박 3일',
            style: preferences.campingStyle === 'car' ? '차박' :
                preferences.campingStyle === 'auto' ? '오토캠핑' : '백패킹',
            schedule
        };
    };

    const handleGetRecommendations = () => {
        if (!preferences.campingStyle || !preferences.duration || !preferences.location) {
            alert('모든 항목을 선택해주세요!');
            return;
        }

        const recommendations = getRecommendations();
        onRecommend(recommendations);

        // Reset
        setPreferences({
            campingStyle: '',
            duration: '',
            location: '',
            foodStyle: [],
            allergies: [],
            dietary: [],
            maxSpicy: 3
        });

        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content wizard-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>🎯 맞춤 추천</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    {/* Camping Style */}
                    <div className="wizard-section">
                        <h3 className="wizard-question">Q1. 캠핑 스타일은? <span className="required-badge">필수</span></h3>
                        <div className="wizard-options">
                            {[
                                { value: 'car', label: '🚗 차박', desc: '차에서 간편하게' },
                                { value: 'auto', label: '⛺ 오토캠핑', desc: '텐트 + 차량 이동' },
                                { value: 'backpacking', label: '🎒 백패킹', desc: '가볍게 도보로' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`wizard-option ${preferences.campingStyle === option.value ? 'selected' : ''}`}
                                    onClick={() => handleSelect('campingStyle', option.value)}
                                >
                                    <div className="option-label">{option.label}</div>
                                    <div className="option-desc">{option.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="wizard-section">
                        <h3 className="wizard-question">Q2. 캠핑 일수는? <span className="required-badge">필수</span></h3>
                        <div className="wizard-options">
                            {[
                                { value: 'day', label: '☀️ 당일', desc: '2끼' },
                                { value: '1night', label: '🌙 1박2일', desc: '3끼' },
                                { value: '2nights', label: '🌙🌙 2박3일', desc: '5끼' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`wizard-option ${preferences.duration === option.value ? 'selected' : ''}`}
                                    onClick={() => handleSelect('duration', option.value)}
                                >
                                    <div className="option-label">{option.label}</div>
                                    <div className="option-desc">{option.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="wizard-section">
                        <h3 className="wizard-question">Q3. 캠핑 지역은? <span className="required-badge">필수</span></h3>
                        <div className="wizard-options">
                            {[
                                { value: 'coast', label: '🌊 해안', desc: '바다 근처' },
                                { value: 'mountain', label: '⛰️ 산', desc: '산속' },
                                { value: 'valley', label: '🏞️ 계곡', desc: '물놀이' },
                                { value: 'field', label: '🌾 평지', desc: '넓은 공간' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`wizard-option ${preferences.location === option.value ? 'selected' : ''}`}
                                    onClick={() => handleSelect('location', option.value)}
                                >
                                    <div className="option-label">{option.label}</div>
                                    <div className="option-desc">{option.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Food Style */}
                    <div className="wizard-section">
                        <h3 className="wizard-question">Q4. 선호 음식 스타일은? (복수 선택 가능)</h3>
                        <div className="wizard-options">
                            {[
                                { value: 'korean', label: '🇰🇷 한식', desc: '김치, 찌개 등' },
                                { value: 'western', label: '🍕 양식', desc: '파스타, 스테이크' },
                                { value: 'simple', label: '⚡ 간편식', desc: '빠르고 쉽게' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`wizard-option ${preferences.foodStyle.includes(option.value) ? 'selected' : ''}`}
                                    onClick={() => handleSelect('foodStyle', option.value)}
                                >
                                    <div className="option-label">{option.label}</div>
                                    <div className="option-desc">{option.desc}</div>
                                </button>
                            ))}
                        </div>
                        <p className="wizard-hint">※ 선택하지 않으면 모든 스타일 추천</p>
                    </div>

                    {/* Allergies */}
                    <div className="wizard-section">
                        <h3 className="wizard-question">Q5. 알레르기가 있나요? (복수 선택 가능)</h3>
                        <div className="wizard-options wizard-chips">
                            {[
                                { value: 'seafood', label: '🦐 해산물' },
                                { value: 'nuts', label: '🥜 견과류' },
                                { value: 'dairy', label: '🥛 유제품' },
                                { value: 'gluten', label: '🌾 글루텐' },
                                { value: 'soy', label: '🫘 대두' },
                                { value: 'eggs', label: '🥚 계란' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`wizard-chip ${preferences.allergies.includes(option.value) ? 'selected' : ''}`}
                                    onClick={() => handleSelect('allergies', option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        <p className="wizard-hint">※ 해당 재료가 포함된 메뉴는 제외됩니다</p>
                    </div>

                    {/* Dietary Preferences */}
                    <div className="wizard-section">
                        <h3 className="wizard-question">Q6. 식이 제한이 있나요? (복수 선택 가능)</h3>
                        <div className="wizard-options wizard-chips">
                            {[
                                { value: 'vegetarian', label: '🥗 채식' },
                                { value: 'vegan', label: '🌱 비건' },
                                { value: 'halal', label: '🕌 할랄' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`wizard-chip ${preferences.dietary.includes(option.value) ? 'selected' : ''}`}
                                    onClick={() => handleSelect('dietary', option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        <p className="wizard-hint">※ 선택한 식이 제한에 맞는 메뉴만 추천합니다</p>
                    </div>

                    {/* Spicy Level */}
                    <div className="wizard-section">
                        <h3 className="wizard-question">Q7. 매운맛 강도는 어느 정도까지?</h3>
                        <div className="spicy-slider">
                            <input
                                type="range"
                                min="0"
                                max="5"
                                value={preferences.maxSpicy}
                                onChange={(e) => setPreferences(prev => ({ ...prev, maxSpicy: parseInt(e.target.value) }))}
                                className="wizard-range"
                            />
                            <div className="spicy-label">
                                {preferences.maxSpicy === 0 ? '안매움' :
                                    preferences.maxSpicy === 1 ? '약간 매움' :
                                        preferences.maxSpicy === 2 ? '보통 매움' :
                                            preferences.maxSpicy === 3 ? '매움' :
                                                preferences.maxSpicy === 4 ? '많이 매움' : '매우 매움'}
                                <span className="spicy-level"> ({preferences.maxSpicy}/5)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-outline" onClick={onClose}>
                        취소
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleGetRecommendations}
                        disabled={!preferences.campingStyle || !preferences.duration || !preferences.location}
                        style={{ padding: '12px 32px' }}
                    >
                        추천 받기 →
                    </button>
                </div>
            </div>
        </div>
    );
}

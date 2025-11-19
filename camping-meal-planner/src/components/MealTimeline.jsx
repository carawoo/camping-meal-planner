import { useState } from 'react';
import MealCard from './MealCard';
import { meals } from '../data/meals';
import { getMealCategory } from '../utils/mealCalculator';
import { useUserProfile } from '../hooks/useUserProfile';

export default function MealTimeline({ mealSlots, peopleCount }) {
    const { profile } = useUserProfile();
    const [selectedMeals, setSelectedMeals] = useState({});

    // 인원에 맞는 메뉴 필터링
    const getRecommendedMeals = (mealType) => {
        const category = getMealCategory(mealType);
        let availableMeals = meals[category];

        // 알레르기 필터링
        availableMeals = availableMeals.filter(meal =>
            !meal.allergens.some(allergen => profile.allergies.includes(allergen))
        );

        // 식이 제한 필터링
        if (profile.dietary.length > 0) {
            availableMeals = availableMeals.filter(meal =>
                profile.dietary.every(diet => meal.dietary.includes(diet))
            );
        }

        // 인원에 맞는 메뉴 우선 정렬
        const peopleNum = peopleCount === '1-2' ? 2 : peopleCount === '3-4' ? 4 : 6;
        availableMeals.sort((a, b) => {
            const aDiff = Math.abs(a.servings - peopleNum);
            const bDiff = Math.abs(b.servings - peopleNum);
            return aDiff - bDiff;
        });

        return availableMeals;
    };

    // 초기 메뉴 선택
    const getSelectedMeal = (slotIndex, mealType) => {
        if (!selectedMeals[slotIndex]) {
            const recommended = getRecommendedMeals(mealType);
            return recommended[0] || meals[getMealCategory(mealType)][0];
        }
        return selectedMeals[slotIndex];
    };

    // 메뉴 변경
    const handleSwapMeal = (slotIndex, mealType) => {
        const recommended = getRecommendedMeals(mealType);
        const currentMeal = getSelectedMeal(slotIndex, mealType);
        const currentIndex = recommended.findIndex(m => m.id === currentMeal.id);
        const nextIndex = (currentIndex + 1) % recommended.length;

        setSelectedMeals(prev => ({
            ...prev,
            [slotIndex]: recommended[nextIndex]
        }));
    };

    return (
        <div className="meal-timeline">
            <h2 className="timeline-title">🍽️ 추천 식단</h2>
            <p className="timeline-subtitle">총 {mealSlots.length}끼 준비하시면 됩니다!</p>

            <div className="timeline-container">
                {mealSlots.map((slot, index) => {
                    const meal = getSelectedMeal(index, slot.type);

                    return (
                        <div key={index} className="timeline-item">
                            {/* Timeline Line */}
                            {index < mealSlots.length - 1 && <div className="timeline-line" />}

                            {/* Timeline Marker */}
                            <div className="timeline-marker">
                                <span className="timeline-icon">{slot.icon}</span>
                            </div>

                            <div className="timeline-content">
                                <h3 className="timeline-meal-label">{slot.label}</h3>
                                <MealCard
                                    meal={meal}
                                    onSwap={() => handleSwapMeal(index, slot.type)}
                                    peopleCount={peopleCount}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

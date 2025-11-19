import { useMemo } from 'react';
import MealCard from './MealCard';
import { meals } from '../data/meals';

export default function MealGrid({ filters }) {
    // Combine all meals into one array
    const allMeals = useMemo(() => {
        return [...meals.arrival, ...meals.dinner, ...meals.breakfast];
    }, []);

    // Filter meals based on filters
    const filteredMeals = useMemo(() => {
        return allMeals.filter(meal => {
            // Filter hidden items (e.g. side items from split combos)
            if (meal.isHidden) return false;

            // Filter by allergens
            if (filters.allergies.length > 0) {
                if (meal.allergens.some(allergen => filters.allergies.includes(allergen))) {
                    return false;
                }
            }

            // Filter by dietary preferences
            if (filters.dietary.length > 0) {
                if (!filters.dietary.every(diet => meal.dietary.includes(diet))) {
                    return false;
                }
            }

            // Filter by spicy level
            if (meal.spicyLevel > filters.maxSpicy) {
                return false;
            }

            // Filter by people
            if (filters.people !== 'all') {
                const peopleNum = filters.people === '1-2' ? 2 : filters.people === '3-4' ? 4 : 6;
                if (Math.abs(meal.servings - peopleNum) > 2) {
                    return false;
                }
            }

            // Filter by time of day (category)
            if (filters.timeOfDay !== 'all') {
                const mealCategory = meals.breakfast.includes(meal) ? 'breakfast' :
                    meals.dinner.includes(meal) ? 'dinner' : 'lunch';

                if (filters.timeOfDay !== mealCategory) {
                    return false;
                }
            }

            // Filter by difficulty
            if (filters.difficulty !== 'all') {
                if (meal.difficulty !== filters.difficulty) {
                    return false;
                }
            }

            return true;
        });
    }, [allMeals, filters]);

    return (
        <div className="meal-grid-container">
            <div className="meal-count">
                {filteredMeals.length}개의 메뉴
            </div>

            <div className="meal-grid">
                {filteredMeals.map(meal => (
                    <MealCard
                        key={meal.id}
                        meal={meal}
                    />
                ))}
            </div>

            {filteredMeals.length === 0 && (
                <div className="no-results">
                    <p>조건에 맞는 메뉴가 없습니다.</p>
                    <p className="hint">필터를 조정해보세요!</p>
                </div>
            )}
        </div>
    );
}

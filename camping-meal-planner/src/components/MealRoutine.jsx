import React, { useState, useMemo } from 'react';
import MealCard from './MealCard';
import MealFilter from './MealFilter';
import MealSearch from './MealSearch';
import { meals } from '../data/meals';
import { useUserProfile } from '../hooks/useUserProfile';

const MealRoutine = () => {
    const { profile } = useUserProfile();

    const [selections, setSelections] = useState({
        arrival: 0,
        dinner: 0,
        breakfast: 0
    });

    const [filters, setFilters] = useState({
        category: 'all',
        difficulty: 'all',
        priceRange: 'all'
    });

    const [searchTerm, setSearchTerm] = useState('');

    // 스마트 필터링 로직 - 항상 메뉴 반환
    const smartFilterMeals = (mealList) => {
        // 0단계: 숨겨진 메뉴 필터링 (사이드 메뉴 등)
        const visibleMeals = mealList.filter(meal => !meal.isHidden);

        // 1단계: 알레르기 필터링 (절대적)
        const safeMeals = visibleMeals.filter(meal =>
            !meal.allergens.some(allergen => profile.allergies.includes(allergen))
        );

        // 2단계: 식이 제한 필터링
        const dietarySafeMeals = safeMeals.filter(meal => {
            if (profile.dietary.length === 0) return true;
            return profile.dietary.every(diet => meal.dietary.includes(diet));
        });

        // 3단계: 선호도 필터링 (부드럽게)
        const preferredMeals = dietarySafeMeals.filter(meal => {
            // 검색어 필터
            if (searchTerm && !meal.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            // 카테고리 필터
            if (filters.category !== 'all' && meal.category !== filters.category) {
                return false;
            }

            // 난이도 필터
            if (filters.difficulty !== 'all' && meal.difficulty !== filters.difficulty) {
                return false;
            }

            // 가격대 필터
            if (filters.priceRange !== 'all' && meal.priceRange !== filters.priceRange) {
                return false;
            }

            return true;
        });

        // 4단계: Fallback - 선호도 메뉴가 없으면 안전한 메뉴 중 인기순
        if (preferredMeals.length > 0) {
            return { meals: preferredMeals, isFallback: false };
        }

        // 검색어가 있으면 검색 결과가 없다는 것을 명확히 함
        if (searchTerm) {
            const searchResults = dietarySafeMeals.filter(meal =>
                meal.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (searchResults.length > 0) {
                return { meals: searchResults, isFallback: true };
            }
        }

        // 그 외의 경우 인기 메뉴 추천
        const fallbackMeals = dietarySafeMeals
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5);

        return {
            meals: fallbackMeals.length > 0 ? fallbackMeals : safeMeals.slice(0, 5),
            isFallback: true
        };
    };

    const filteredMeals = useMemo(() => ({
        arrival: smartFilterMeals(meals.arrival),
        dinner: smartFilterMeals(meals.dinner),
        breakfast: smartFilterMeals(meals.breakfast)
    }), [filters, searchTerm, profile]);

    const handleSwap = (type) => {
        const availableMeals = filteredMeals[type].meals;
        if (availableMeals.length === 0) return;

        setSelections(prev => ({
            ...prev,
            [type]: (prev[type] + 1) % availableMeals.length
        }));
    };

    const Section = ({ title, type, step, isLast }) => {
        const { meals: availableMeals, isFallback } = filteredMeals[type];
        const currentMeal = availableMeals[selections[type]];

        return (
            <div style={{ position: 'relative', paddingBottom: isLast ? 0 : '48px' }}>
                {/* Timeline Line */}
                {!isLast && <div className="timeline-line" />}

                {/* Timeline Marker */}
                <div className="timeline-marker">{step}</div>

                <div style={{ paddingLeft: '40px' }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        margin: '0 0 16px 0',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'var(--color-primary)'
                    }}>
                        {title}
                        <span style={{
                            marginLeft: '12px',
                            fontSize: '0.875rem',
                            color: 'var(--color-text-secondary)',
                            fontWeight: 'normal'
                        }}>
                            ({availableMeals.length}개 메뉴)
                        </span>
                    </h2>

                    {isFallback && (
                        <div style={{
                            padding: '0.75rem 1rem',
                            marginBottom: '1rem',
                            background: 'rgba(211, 84, 0, 0.1)',
                            borderLeft: '4px solid var(--color-accent)',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            color: 'var(--color-text)'
                        }}>
                            💡 조건에 정확히 맞는 메뉴가 없어서 인기 메뉴를 추천해드려요!
                        </div>
                    )}

                    {currentMeal && (
                        <MealCard
                            meal={currentMeal}
                            onSwap={() => handleSwap(type)}
                            isFallback={isFallback}
                        />
                    )}
                </div>
            </div>
        );
    };

    return (
        <div id="routine" style={{ padding: '0 20px 40px' }}>
            {/* 검색 & 필터 */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                    fontSize: '2rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    color: 'var(--color-text-primary)'
                }}>
                    🍽️ 메뉴 찾기
                </h2>
                <MealSearch onSearch={setSearchTerm} />
                <MealFilter onFilterChange={setFilters} />
            </div>

            {/* 타임라인 */}
            <div className="timeline-container">
                <Section title="도착해서 점심" type="arrival" step="1" />
                <Section title="본격적인 저녁" type="dinner" step="2" />
                <Section title="다음 날 아침" type="breakfast" step="3" isLast />
            </div>
        </div>
    );
};

export default MealRoutine;

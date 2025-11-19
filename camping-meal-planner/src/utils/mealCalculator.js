// 여행 계획 기반 식사 계산
export function calculateMeals(duration, arrivalTime) {
    const meals = [];

    if (duration === '1night') {
        // 1박2일
        if (arrivalTime === 'lunch-before') {
            meals.push(
                { day: 1, type: 'lunch', icon: '🌅', label: 'Day 1 점심' },
                { day: 1, type: 'dinner', icon: '🌆', label: 'Day 1 저녁' },
                { day: 2, type: 'breakfast', icon: '☀️', label: 'Day 2 아침' }
            );
        } else if (arrivalTime === 'lunch-after') {
            meals.push(
                { day: 1, type: 'dinner', icon: '🌆', label: 'Day 1 저녁' },
                { day: 2, type: 'breakfast', icon: '☀️', label: 'Day 2 아침' }
            );
        } else {
            // dinner
            meals.push(
                { day: 1, type: 'dinner', icon: '🌆', label: 'Day 1 저녁' },
                { day: 2, type: 'breakfast', icon: '☀️', label: 'Day 2 아침' }
            );
        }
    } else if (duration === '2nights') {
        // 2박3일
        if (arrivalTime === 'lunch-before') {
            meals.push(
                { day: 1, type: 'lunch', icon: '🌅', label: 'Day 1 점심' },
                { day: 1, type: 'dinner', icon: '🌆', label: 'Day 1 저녁' },
                { day: 2, type: 'breakfast', icon: '☀️', label: 'Day 2 아침' },
                { day: 2, type: 'lunch', icon: '🌅', label: 'Day 2 점심' },
                { day: 2, type: 'dinner', icon: '🌆', label: 'Day 2 저녁' },
                { day: 3, type: 'breakfast', icon: '☀️', label: 'Day 3 아침' }
            );
        } else if (arrivalTime === 'lunch-after') {
            meals.push(
                { day: 1, type: 'dinner', icon: '🌆', label: 'Day 1 저녁' },
                { day: 2, type: 'breakfast', icon: '☀️', label: 'Day 2 아침' },
                { day: 2, type: 'lunch', icon: '🌅', label: 'Day 2 점심' },
                { day: 2, type: 'dinner', icon: '🌆', label: 'Day 2 저녁' },
                { day: 3, type: 'breakfast', icon: '☀️', label: 'Day 3 아침' }
            );
        } else {
            // dinner
            meals.push(
                { day: 1, type: 'dinner', icon: '🌆', label: 'Day 1 저녁' },
                { day: 2, type: 'breakfast', icon: '☀️', label: 'Day 2 아침' },
                { day: 2, type: 'lunch', icon: '🌅', label: 'Day 2 점심' },
                { day: 2, type: 'dinner', icon: '🌆', label: 'Day 2 저녁' },
                { day: 3, type: 'breakfast', icon: '☀️', label: 'Day 3 아침' }
            );
        }
    } else if (duration === '3nights') {
        // 3박4일
        if (arrivalTime === 'lunch-before') {
            meals.push(
                { day: 1, type: 'lunch', icon: '🌅', label: 'Day 1 점심' },
                { day: 1, type: 'dinner', icon: '🌆', label: 'Day 1 저녁' },
                { day: 2, type: 'breakfast', icon: '☀️', label: 'Day 2 아침' },
                { day: 2, type: 'lunch', icon: '🌅', label: 'Day 2 점심' },
                { day: 2, type: 'dinner', icon: '🌆', label: 'Day 2 저녁' },
                { day: 3, type: 'breakfast', icon: '☀️', label: 'Day 3 아침' },
                { day: 3, type: 'lunch', icon: '🌅', label: 'Day 3 점심' },
                { day: 3, type: 'dinner', icon: '🌆', label: 'Day 3 저녁' },
                { day: 4, type: 'breakfast', icon: '☀️', label: 'Day 4 아침' }
            );
        } else if (arrivalTime === 'lunch-after') {
            meals.push(
                { day: 1, type: 'dinner', icon: '🌆', label: 'Day 1 저녁' },
                { day: 2, type: 'breakfast', icon: '☀️', label: 'Day 2 아침' },
                { day: 2, type: 'lunch', icon: '🌅', label: 'Day 2 점심' },
                { day: 2, type: 'dinner', icon: '🌆', label: 'Day 2 저녁' },
                { day: 3, type: 'breakfast', icon: '☀️', label: 'Day 3 아침' },
                { day: 3, type: 'lunch', icon: '🌅', label: 'Day 3 점심' },
                { day: 3, type: 'dinner', icon: '🌆', label: 'Day 3 저녁' },
                { day: 4, type: 'breakfast', icon: '☀️', label: 'Day 4 아침' }
            );
        } else {
            // dinner
            meals.push(
                { day: 1, type: 'dinner', icon: '🌆', label: 'Day 1 저녁' },
                { day: 2, type: 'breakfast', icon: '☀️', label: 'Day 2 아침' },
                { day: 2, type: 'lunch', icon: '🌅', label: 'Day 2 점심' },
                { day: 2, type: 'dinner', icon: '🌆', label: 'Day 2 저녁' },
                { day: 3, type: 'breakfast', icon: '☀️', label: 'Day 3 아침' },
                { day: 3, type: 'lunch', icon: '🌅', label: 'Day 3 점심' },
                { day: 3, type: 'dinner', icon: '🌆', label: 'Day 3 저녁' },
                { day: 4, type: 'breakfast', icon: '☀️', label: 'Day 4 아침' }
            );
        }
    }

    return meals;
}

// 식사 타입에 맞는 메뉴 카테고리 매핑
export function getMealCategory(mealType) {
    if (mealType === 'breakfast') return 'breakfast';
    if (mealType === 'lunch') return 'arrival';
    if (mealType === 'dinner') return 'dinner';
    return 'arrival';
}

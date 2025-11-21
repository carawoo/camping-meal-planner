import React, { useState, useEffect } from 'react';
import { meals } from '../data/meals';

// 현재 주차 계산 (월요일 시작)
const getCurrentWeek = () => {
    const now = new Date();
    const year = now.getFullYear();

    // 이번주 월요일 날짜 계산
    const day = now.getDay(); // 0(일) ~ 6(토)
    const diff = day === 0 ? -6 : 1 - day; // 월요일로 조정
    const monday = new Date(now);
    monday.setDate(now.getDate() + diff);
    monday.setHours(0, 0, 0, 0);

    // ISO 주차 계산
    const weekNum = Math.ceil((monday - new Date(year, 0, 1)) / (7 * 24 * 60 * 60 * 1000));
    return `${year}-W${String(weekNum).padStart(2, '0')}`;
};

// 다음 월요일까지 남은 시간 계산
const getTimeUntilNextMonday = () => {
    const now = new Date();
    const day = now.getDay();
    const daysUntilMonday = day === 0 ? 1 : 8 - day;
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + daysUntilMonday);
    nextMonday.setHours(0, 0, 0, 0);

    const diff = nextMonday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return { days, hours, total: diff };
};

export default function Rankings({ onViewMeal }) {
    const [mealClicks, setMealClicks] = useState({});
    const [rankedMeals, setRankedMeals] = useState([]);
    const [previousRankings, setPreviousRankings] = useState({});
    const [timeUntilReset, setTimeUntilReset] = useState({ days: 0, hours: 0 });
    const [currentWeek, setCurrentWeek] = useState('');

    const loadRankings = () => {
        const week = getCurrentWeek();
        setCurrentWeek(week);

        // localStorage에서 실제 데이터 로드
        const weeklyData = JSON.parse(localStorage.getItem('weekly_rankings') || '{}');

        // 현재 주차 데이터가 없으면 빈 객체로 초기화
        if (!weeklyData[week]) {
            weeklyData[week] = {};
            localStorage.setItem('weekly_rankings', JSON.stringify(weeklyData));
        }

        const currentWeekData = weeklyData[week];
        const previousWeek = getPreviousWeek(week);
        const previousWeekData = weeklyData[previousWeek] || {};

        setMealClicks(currentWeekData);

        // 이전 주차 순위 저장 (순위 변동 계산용)
        const prevRankMap = {};
        Object.entries(previousWeekData)
            .sort((a, b) => b[1] - a[1])
            .forEach(([mealId], index) => {
                prevRankMap[mealId] = index;
            });
        setPreviousRankings(prevRankMap);

        // Get all meals and sort by clicks
        const allMeals = [];
        Object.values(meals).forEach(categoryMeals => {
            if (Array.isArray(categoryMeals)) {
                allMeals.push(...categoryMeals);
            }
        });

        // Sort by clicks (descending) and filter out hidden meals
        const withClicks = allMeals
            .filter(meal => !meal.isHidden)
            .map(meal => ({
                ...meal,
                clicks: currentWeekData[meal.id] || 0,
                previousRank: prevRankMap[meal.id]
            }));

        // 클릭 데이터가 있는지 확인
        const hasClickData = withClicks.some(m => m.clicks > 0);

        // 클릭 데이터가 있으면 클릭 수로, 없으면 평점으로 정렬
        const sorted = hasClickData
            ? withClicks.sort((a, b) => b.clicks - a.clicks).slice(0, 20)
            : withClicks.sort((a, b) => b.rating - a.rating).slice(0, 20);

        setRankedMeals(sorted);
    };

    useEffect(() => {
        // 초기 로드
        loadRankings();

        // 리셋까지 남은 시간 업데이트
        const updateTimer = () => {
            setTimeUntilReset(getTimeUntilNextMonday());
        };
        updateTimer();
        const timer = setInterval(updateTimer, 60000); // 1분마다 업데이트

        // 10초마다 랭킹 데이터 새로고침 (실시간 업데이트)
        const rankingRefresh = setInterval(loadRankings, 10000);

        return () => {
            clearInterval(timer);
            clearInterval(rankingRefresh);
        };
    }, []);

    const getPreviousWeek = (weekStr) => {
        const [year, week] = weekStr.split('-W').map(Number);
        const prevWeek = week - 1;
        if (prevWeek < 1) {
            return `${year - 1}-W52`;
        }
        return `${year}-W${String(prevWeek).padStart(2, '0')}`;
    };

    const getRankBadge = (index) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return `${index + 1}위`;
    };

    // 순위 변동 계산
    const getRankChange = (currentIndex, previousRank) => {
        if (previousRank === undefined) {
            return { type: 'new', text: 'NEW', icon: '🆕' };
        }
        const change = previousRank - currentIndex;
        if (change > 0) {
            return { type: 'up', text: `${change}↑`, icon: '📈' };
        } else if (change < 0) {
            return { type: 'down', text: `${Math.abs(change)}↓`, icon: '📉' };
        }
        return { type: 'same', text: '-', icon: '➖' };
    };

    // 게이미피케이션 배지
    const getAchievementBadge = (meal, index) => {
        const badges = [];

        // 1위 3주 연속
        if (index === 0 && meal.clicks > 100) {
            badges.push({ emoji: '👑', text: '킹' });
        }

        // 핫한 메뉴 (조회수 높음)
        if (meal.clicks >= 50) {
            badges.push({ emoji: '🔥', text: 'HOT' });
        }

        // 신규 진입 & 상위권
        if (meal.previousRank === undefined && index < 5) {
            badges.push({ emoji: '⚡', text: '급상승' });
        }

        return badges;
    };

    return (
        <div className="rankings-container">
            <div className="rankings-header">
                <h1>📊 이번주 인기 랭킹</h1>
                <p className="rankings-subtitle">가장 많이 클릭된 캠핑 메뉴</p>

                {/* 주차 정보 & 리셋 타이머 */}
                <div className="season-info-card">
                    <div className="season-info-item">
                        <div className="season-info-label">현재 시즌</div>
                        <div className="season-info-value">{currentWeek}</div>
                    </div>
                    <div className="season-info-divider"></div>
                    <div className="season-info-item season-info-right">
                        <div className="season-info-label">리셋까지</div>
                        <div className="season-info-value">
                            {timeUntilReset.days}일 {timeUntilReset.hours}시간 ⏰
                        </div>
                    </div>
                </div>
            </div>

            <div className="rankings-list">
                {rankedMeals.map((meal, index) => {
                    const rankChange = getRankChange(index, meal.previousRank);
                    const badges = getAchievementBadge(meal, index);

                    return (
                        <div
                            key={meal.id}
                            className={`ranking-item ${index < 3 ? 'ranking-item-top' : ''}`}
                            onClick={() => onViewMeal(meal)}
                        >
                            <div className={`ranking-badge ${index < 3 ? 'ranking-badge-top' : ''}`}>
                                {getRankBadge(index)}
                            </div>

                            {/* 순위 변동 표시 */}
                            <div className={`rank-change rank-change-${rankChange.type}`}>
                                {rankChange.icon} {rankChange.text}
                            </div>

                            <div className="ranking-image">
                                <img src={meal.image} alt={meal.title} />
                            </div>
                            <div className="ranking-info">
                                <h3 className="ranking-title">{meal.title}</h3>

                                {/* 배지 표시 */}
                                {badges.length > 0 && (
                                    <div className="achievement-badges">
                                        {badges.map((badge, idx) => (
                                            <span key={idx} className="achievement-badge">
                                                {badge.emoji} {badge.text}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="ranking-meta">
                                    <span>⏱️ {meal.cookingTime}분</span>
                                    <span>⭐ {meal.rating}</span>
                                    <span>💰 ₩{meal.price?.toLocaleString()}</span>
                                </div>
                                <div className="ranking-stats">
                                    <span className="click-count">
                                        🔥 {meal.clicks || 0}회 조회
                                    </span>
                                </div>
                            </div>
                            <div className="ranking-arrow">→</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

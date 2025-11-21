import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import MealGrid from './components/MealGrid';
import MealSection from './components/MealSection';
import Rankings from './components/Rankings';
import CommunityFeed from './components/CommunityFeed';
import RecommendationForm from './components/RecommendationForm';
import RecommendationWizard from './components/RecommendationWizard';
import MealPlan from './components/MealPlan';
import SavedPlans from './components/SavedPlans';
import BottomNav from './components/BottomNav';
import FloatingActionButton from './components/FloatingActionButton';
import MealDetail from './components/MealDetail';
import { meals } from './data/meals';

function App() {
  const [filters, setFilters] = useState({
    people: 'all',
    timeOfDay: 'all',
    difficulty: 'all',
    allergies: [],
    dietary: [],
    maxSpicy: 3  // 기본값 "보통"으로 변경
  });

  const [activeTab, setActiveTab] = useState('home'); // home, rankings, saved, community
  const [isCommunityFeedOpen, setIsCommunityFeedOpen] = useState(false);
  const [isRecommendationFormOpen, setIsRecommendationFormOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isMealPlanOpen, setIsMealPlanOpen] = useState(false);
  const [isSavedPlansOpen, setIsSavedPlansOpen] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [savedPlans, setSavedPlans] = useState([]);

  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isMealDetailOpen, setIsMealDetailOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Detect scroll position for scroll-to-top button and floating button
  useEffect(() => {
    const handleScroll = () => {
      // Show buttons when scrolled past Hero section (approximately 400px)
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load saved plans from localStorage
  useEffect(() => {
    const savedP = localStorage.getItem('camping_plans');
    if (savedP) {
      try {
        const plans = JSON.parse(savedP);
        // Filter out invalid plans (where name is not a string)
        const validPlans = plans.filter(plan =>
          plan && typeof plan.name === 'string' && plan.schedule
        );

        // If we filtered out invalid plans, update localStorage
        if (validPlans.length !== plans.length) {
          localStorage.setItem('camping_plans', JSON.stringify(validPlans));
        }

        setSavedPlans(validPlans);
      } catch (e) {
        console.error('Failed to load plans:', e);
        localStorage.removeItem('camping_plans');
      }
    }
  }, []);

  // Helper function to get all meals from all categories
  const getAllMeals = () => {
    const allMeals = [];
    Object.values(meals).forEach(categoryMeals => {
      if (Array.isArray(categoryMeals)) {
        allMeals.push(...categoryMeals);
      }
    });
    return allMeals;
  };

  // Track meal clicks (주차별 저장)
  const trackMealClick = (mealId) => {
    // 현재 주차 계산
    const getCurrentWeek = () => {
      const now = new Date();
      const year = now.getFullYear();
      const day = now.getDay();
      const diff = day === 0 ? -6 : 1 - day;
      const monday = new Date(now);
      monday.setDate(now.getDate() + diff);
      monday.setHours(0, 0, 0, 0);
      const weekNum = Math.ceil((monday - new Date(year, 0, 1)) / (7 * 24 * 60 * 60 * 1000));
      return `${year}-W${String(weekNum).padStart(2, '0')}`;
    };

    const currentWeek = getCurrentWeek();

    // 주차별 데이터 로드
    const weeklyData = JSON.parse(localStorage.getItem('weekly_rankings') || '{}');

    // 현재 주차 데이터 업데이트
    if (!weeklyData[currentWeek]) {
      weeklyData[currentWeek] = {};
    }
    weeklyData[currentWeek][mealId] = (weeklyData[currentWeek][mealId] || 0) + 1;

    // 저장 (최근 8주만 유지)
    const weeks = Object.keys(weeklyData).sort().reverse();
    const recentWeeks = weeks.slice(0, 8);
    const cleanedData = {};
    recentWeeks.forEach(week => {
      cleanedData[week] = weeklyData[week];
    });

    localStorage.setItem('weekly_rankings', JSON.stringify(cleanedData));

    // 레거시 호환성을 위해 기존 형식도 유지
    const clicks = JSON.parse(localStorage.getItem('meal_clicks') || '{}');
    clicks[mealId] = (clicks[mealId] || 0) + 1;
    localStorage.setItem('meal_clicks', JSON.stringify(clicks));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSavePlan = (planName, planData) => {
    const newPlan = {
      id: Date.now().toString(),
      name: planName,
      ...planData,
      createdAt: new Date().toISOString()
    };

    const updatedPlans = [...savedPlans, newPlan];
    setSavedPlans(updatedPlans);
    localStorage.setItem('camping_plans', JSON.stringify(updatedPlans));

    alert(`"${planName}" 식단표가 저장되었습니다!`);
  };

  const handleSubmitRecommendation = (recommendationData) => {
    const newRecommendation = {
      id: Date.now().toString(),
      ...recommendationData,
      likes: 0,
      timestamp: Date.now(),
      isMock: false
    };

    const saved = localStorage.getItem('camping_recommendations');
    const existing = saved ? JSON.parse(saved) : [];
    const updated = [newRecommendation, ...existing];

    localStorage.setItem('camping_recommendations', JSON.stringify(updated));
    alert('추천이 등록되었습니다! 🎉');
  };

  const handleWizardRecommend = (plan) => {
    setMealPlan(plan);
    setIsMealPlanOpen(true);
  };

  const handleDeletePlan = (planId) => {
    const updatedPlans = savedPlans.filter(p => p.id !== planId);
    setSavedPlans(updatedPlans);
    localStorage.setItem('camping_plans', JSON.stringify(updatedPlans));
  };

  const handleRenamePlan = (planId, newName) => {
    const updatedPlans = savedPlans.map(p =>
      p.id === planId ? { ...p, name: newName } : p
    );
    setSavedPlans(updatedPlans);
    localStorage.setItem('camping_plans', JSON.stringify(updatedPlans));
  };

  return (
    <Layout>
      {activeTab === 'home' && (
        <>
          <Hero
            onNavigateToCommunity={() => setActiveTab('community')}
            onOpenWizard={() => setIsWizardOpen(true)}
          />

          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Section-based Meal Display */}
          <div className="home-sections">
            {/* Popular This Week */}
            <MealSection
              title="🔥 이번주 인기 메뉴"
              meals={getAllMeals()
                .filter(m => !m.isHidden && m.rating >= 4.5)
                .sort((a, b) => b.rating - a.rating)}
              layout="horizontal"
              onViewMeal={(meal) => {
                trackMealClick(meal.id);
                setSelectedMeal(meal);
                setIsMealDetailOpen(true);
              }}
              onSeeAll={() => setActiveTab('rankings')}
            />

            {/* Beginner Recipes */}
            <MealSection
              title="👨‍🍳 초보자도 쉬운 메뉴"
              meals={getAllMeals()
                .filter(m => !m.isHidden && m.difficulty === 'easy')
                .slice(0, 5)}
              layout="list"
              onViewMeal={(meal) => {
                trackMealClick(meal.id);
                setSelectedMeal(meal);
                setIsMealDetailOpen(true);
              }}
            />

            {/* Camping Favorites */}
            <MealSection
              title="🏕️ 캠핑 추천 메뉴"
              meals={getAllMeals()
                .filter(m => !m.isHidden && (
                  m.tags?.includes('camping') ||
                  m.tags?.includes('quick') ||
                  m.tags?.includes('portable')
                ))}
              layout="grid"
              onViewMeal={(meal) => {
                trackMealClick(meal.id);
                setSelectedMeal(meal);
                setIsMealDetailOpen(true);
              }}
            />
          </div>
        </>
      )}

      {activeTab === 'rankings' && (
        <Rankings
          onViewMeal={(meal) => {
            trackMealClick(meal.id);
            setSelectedMeal(meal);
            setIsMealDetailOpen(true);
          }}
        />
      )}

      {activeTab === 'plans' && (
        <div className="tab-content">
          <SavedPlans
            isOpen={true}
            onClose={() => setActiveTab('home')}
            savedPlans={savedPlans}
            onDeletePlan={handleDeletePlan}
            onRenamePlan={handleRenamePlan}
            inlineMode={true}
            onOpenWizard={() => setIsWizardOpen(true)}
          />
        </div>
      )}

      {activeTab === 'community' && (
        <div className="tab-content">
          <CommunityFeed
            isOpen={true}
            onClose={() => setActiveTab('home')}
            onOpenForm={() => setIsRecommendationFormOpen(true)}
            isModal={false}
          />
        </div>
      )}

      {activeTab === 'recipes' && (
        <div className="tab-content">
          <h2 style={{ padding: '60px 24px', textAlign: 'center' }}>내 레시피 (개발 예정)</h2>
        </div>
      )}

      <RecommendationForm
        isOpen={isRecommendationFormOpen}
        onClose={() => setIsRecommendationFormOpen(false)}
        onSubmit={handleSubmitRecommendation}
      />

      <RecommendationWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onRecommend={handleWizardRecommend}
      />

      <MealPlan
        isOpen={isMealPlanOpen}
        onClose={() => setIsMealPlanOpen(false)}
        plan={mealPlan}
        onSave={handleSavePlan}
      />

      {!isSavedPlansOpen && activeTab !== 'plans' && (
        <SavedPlans
          isOpen={isSavedPlansOpen}
          onClose={() => setIsSavedPlansOpen(false)}
          savedPlans={savedPlans}
          onDeletePlan={handleDeletePlan}
          onRenamePlan={handleRenamePlan}
        />
      )}

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Floating Action Buttons */}
      {!isWizardOpen && !isRecommendationFormOpen && !isMealPlanOpen && !isSavedPlansOpen && !isMealDetailOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          zIndex: 9999
        }}>
          {activeTab === 'home' && showScrollTop && (
            <FloatingActionButton
              icon="✨"
              label="맞춤 추천"
              onClick={() => setIsWizardOpen(true)}
            />
          )}

          {activeTab === 'community' && (
            <FloatingActionButton
              icon="✏️"
              label="글 쓰기"
              onClick={() => setIsRecommendationFormOpen(true)}
              color="primary"
            />
          )}
        </div>
      )}

      <footer className="footer">
      </footer>

      {/* Meal Detail Modal */}
      {isMealDetailOpen && selectedMeal && (
        <MealDetail
          meal={selectedMeal}
          onClose={() => {
            setIsMealDetailOpen(false);
            setSelectedMeal(null);
          }}
        />
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && !isWizardOpen && !isRecommendationFormOpen && !isMealPlanOpen && !isSavedPlansOpen && !isMealDetailOpen && !isCommunityFeedOpen && (
        <button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="맨 위로 가기"
        >
          ↑
        </button>
      )}
    </Layout>
  );
}

export default App;

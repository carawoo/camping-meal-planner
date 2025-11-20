import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import MealGrid from './components/MealGrid';
import MealSection from './components/MealSection';
import CommunityFeed from './components/CommunityFeed';
import RecommendationForm from './components/RecommendationForm';
import RecommendationWizard from './components/RecommendationWizard';
import MealPlan from './components/MealPlan';
import SavedPlans from './components/SavedPlans';
import BottomNav from './components/BottomNav';
import FloatingActionButton from './components/FloatingActionButton';
import Favorites from './components/Favorites';
import MealDetail from './components/MealDetail';
import { meals } from './data/meals';

function App() {
  const [filters, setFilters] = useState({
    people: 'all',
    timeOfDay: 'all',
    difficulty: 'all',
    allergies: [],
    dietary: [],
    maxSpicy: 1
  });

  const [isCommunityFeedOpen, setIsCommunityFeedOpen] = useState(false);
  const [isRecommendationFormOpen, setIsRecommendationFormOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isMealPlanOpen, setIsMealPlanOpen] = useState(false);
  const [isSavedPlansOpen, setIsSavedPlansOpen] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [savedPlans, setSavedPlans] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isMealDetailOpen, setIsMealDetailOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Detect scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load saved plans and favorites from localStorage
  useEffect(() => {
    const savedP = localStorage.getItem('camping_plans');
    if (savedP) {
      try {
        setSavedPlans(JSON.parse(savedP));
      } catch (e) {
        console.error('Failed to load plans:', e);
      }
    }

    const savedF = localStorage.getItem('camping_favorites');
    if (savedF) {
      try {
        setFavorites(JSON.parse(savedF));
      } catch (e) {
        console.error('Failed to load favorites:', e);
      }
    }
  }, []);

  const toggleFavorite = (mealId) => {
    const newFavorites = favorites.includes(mealId)
      ? favorites.filter(id => id !== mealId)
      : [...favorites, mealId];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteMeals', JSON.stringify(newFavorites));
  };

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
                setSelectedMeal(meal);
                setIsMealDetailOpen(true);
              }}
            />

            {/* Beginner Recipes */}
            <MealSection
              title="👨‍🍳 초보자도 쉬운 메뉴"
              meals={getAllMeals()
                .filter(m => !m.isHidden && m.difficulty === 'easy')
                .slice(0, 5)}
              layout="list"
              onViewMeal={(meal) => {
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
                setSelectedMeal(meal);
                setIsMealDetailOpen(true);
              }}
            />
          </div>
        </>
      )}

      {activeTab === 'plans' && (
        <div className="tab-content">
          <SavedPlans
            isOpen={true}
            onClose={() => setActiveTab('home')}
            savedPlans={savedPlans}
            onDeletePlan={handleDeletePlan}
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

      {activeTab === 'favorites' && (
        <div className="tab-content">
          <Favorites
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onNavigateHome={() => setActiveTab('home')}
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
          {activeTab === 'home' && (
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

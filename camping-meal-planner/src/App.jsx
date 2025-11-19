import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import MealGrid from './components/MealGrid';
import CommunityFeed from './components/CommunityFeed';
import RecommendationForm from './components/RecommendationForm';
import RecommendationWizard from './components/RecommendationWizard';
import MealPlan from './components/MealPlan';

function App() {
  const [filters, setFilters] = useState({
    people: 'all',
    timeOfDay: 'all',
    difficulty: 'all',
    allergies: [],
    dietary: [],
    maxSpicy: 5
  });

  const [isCommunityFeedOpen, setIsCommunityFeedOpen] = useState(false);
  const [isRecommendationFormOpen, setIsRecommendationFormOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isMealPlanOpen, setIsMealPlanOpen] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [savedPlans, setSavedPlans] = useState([]);

  // Load saved plans from localStorage
  useEffect(() => {
    const savedP = localStorage.getItem('camping_plans');
    if (savedP) {
      try {
        setSavedPlans(JSON.parse(savedP));
      } catch (e) {
        console.error('Failed to load plans:', e);
      }
    }
  }, []);

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

  return (
    <Layout>
      <Hero
        onOpenCommunity={() => setIsCommunityFeedOpen(true)}
        onOpenWizard={() => setIsWizardOpen(true)}
      />

      <FilterBar onFilterChange={handleFilterChange} />

      <MealGrid
        filters={filters}
      />

      <CommunityFeed
        isOpen={isCommunityFeedOpen}
        onClose={() => setIsCommunityFeedOpen(false)}
        onOpenForm={() => setIsRecommendationFormOpen(true)}
      />

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

      <footer className="footer">
        <p>© 2024 Camping Meal Planner</p>
        <p>더 즐거운 캠핑을 위하여</p>
      </footer>
    </Layout>
  );
}

export default App;

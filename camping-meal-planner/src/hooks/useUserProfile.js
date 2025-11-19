import { useState, useEffect } from 'react';

const STORAGE_KEY = 'camping-meal-planner-profile';

const defaultProfile = {
    allergies: [],
    dietary: [],
    spicyLevel: 3,
    servings: 2,
    budget: 'all'
};

export function useUserProfile() {
    const [profile, setProfile] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : defaultProfile;
        } catch (error) {
            console.error('Failed to load profile:', error);
            return defaultProfile;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
        } catch (error) {
            console.error('Failed to save profile:', error);
        }
    }, [profile]);

    const updateProfile = (updates) => {
        setProfile(prev => ({ ...prev, ...updates }));
    };

    const resetProfile = () => {
        setProfile(defaultProfile);
    };

    return {
        profile,
        updateProfile,
        resetProfile
    };
}

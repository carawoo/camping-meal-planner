import React, { useState, useEffect } from 'react';
import { mockRecommendations } from '../data/communityData';

export default function CommunityTicker({ onClick }) {
    const [items, setItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Load user recommendations from localStorage
        const saved = localStorage.getItem('camping_recommendations');
        const userRecs = saved ? JSON.parse(saved) : [];

        // Combine mock and user recs, sort by likes (most popular first)
        const allRecs = [...userRecs, ...mockRecommendations]
            .sort((a, b) => b.likes - a.likes)
            .slice(0, 5); // Top 5
        setItems(allRecs);
    }, []);

    // Auto-rotate through items
    useEffect(() => {
        if (items.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [items.length]);

    if (items.length === 0) return null;

    return (
        <div className="community-ticker-container" onClick={onClick}>
            <div className="ticker-label">
                🔥 인기 조합
            </div>
            <div className="ticker-ranking">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={`ranking-item ${index === currentIndex ? 'active' : ''}`}
                    >
                        <span className="ranking-number">{index + 1}</span>
                        <span className="ranking-title">{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

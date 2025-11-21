import React, { useState, useEffect } from 'react';
import { mockRecommendations } from '../data/communityData';

export default function Hero({ onNavigateToCommunity, onOpenWizard }) {
    const [currentKeyword, setCurrentKeyword] = useState(0);
    const [keywords, setKeywords] = useState([]);

    // Load community recommendations and populate keywords
    useEffect(() => {
        // Load user recommendations from localStorage
        const saved = localStorage.getItem('camping_recommendations');
        const userRecs = saved ? JSON.parse(saved) : [];

        // Combine mock and user recs, sort by likes (most popular first)
        const allRecs = [...userRecs, ...mockRecommendations]
            .sort((a, b) => b.likes - a.likes)
            .slice(0, 5); // Top 5

        // Extract titles for the rolling keywords
        const titles = allRecs.length > 0
            ? allRecs.map(rec => rec.title)
            : ['캠핑 카레 + 빵', '삼겹살 세트', '치킨 + 맥주'];

        setKeywords(titles);
    }, []);

    useEffect(() => {
        if (keywords.length === 0) return;

        const interval = setInterval(() => {
            setCurrentKeyword((prev) => (prev + 1) % keywords.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [keywords.length]);

    return (
        <section className="hero">
            <div className="hero-overlay"></div>

            <div className="hero-text">
                <h1>
                    캠핑의 맛,<br />
                    <span className="highlight">완벽한 한 끼</span>를<br />
                    계획하세요
                </h1>
                <p>
                    복잡한 고민 없이,<br />
                    당신만의 캠핑 요리 루틴을 만들어보세요.
                </p>

                {/* Search box and buttons container */}
                <div className="hero-actions">
                    {/* Rolling Keywords - Click to open community */}
                    <div
                        className="hero-search-box"
                        onClick={onNavigateToCommunity}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="search-icon">🔍</div>
                        <div className="keyword-roller">
                            {keywords.map((keyword, index) => (
                                <div
                                    key={index}
                                    className={`keyword-item ${index === currentKeyword ? 'active' : ''}`}
                                >
                                    {keyword}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommendation Button */}
                    <button
                        className="btn btn-primary"
                        onClick={onOpenWizard}
                        style={{
                            marginTop: '16px',
                            width: '100%',
                            padding: '14px 24px',
                            fontSize: '1rem',
                            fontWeight: '600'
                        }}
                    >
                        ✨ 맞춤 추천 받기
                    </button>
                </div>
            </div>
        </section>
    );
}

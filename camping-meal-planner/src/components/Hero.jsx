import React, { useState, useEffect } from 'react';

export default function Hero({ onOpenCommunity, onOpenWizard }) {
    const [currentKeyword, setCurrentKeyword] = useState(0);

    const keywords = [
        '떡볶이 + 라면 조합',
        '삼겹살 + 소주 세트',
        '캠핑 카레 + 빵',
        '치킨 + 맥주 파티',
        '일본식 카레 + 밥'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentKeyword((prev) => (prev + 1) % keywords.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

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
                        onClick={onOpenCommunity}
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

                    {/* Buttons */}
                    <button
                        onClick={onOpenWizard}
                        className="hero-btn hero-btn-primary"
                    >
                        🎯 맞춤 추천
                    </button>
                    <button
                        onClick={onOpenCommunity}
                        className="hero-btn hero-btn-secondary"
                    >
                        💬 커뮤니티
                    </button>
                </div>
            </div>
        </section>
    );
}

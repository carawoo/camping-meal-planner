import React from 'react';
import CommunityTicker from './CommunityTicker';

export default function Hero({ onOpenCommunity, onOpenWizard }) {
    return (
        <section className="hero">
            <CommunityTicker onClick={onOpenCommunity} />
            <div className="hero-overlay"></div>
            <div className="hero-content">
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
            </div>


        </section>
    );
}

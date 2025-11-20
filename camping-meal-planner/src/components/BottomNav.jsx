import { useState } from 'react';

export default function BottomNav({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'home', icon: '🏠', label: '홈' },
        { id: 'plans', icon: '📅', label: '식단 계획' },
        { id: 'community', icon: '💬', label: '커뮤니티' },
        { id: 'favorites', icon: '❤️', label: '즐겨찾기' }
    ];

    return (
        <nav className="bottom-nav">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`bottom-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    <span className="bottom-nav-icon">{tab.icon}</span>
                    <span
                        className="bottom-nav-label"
                        style={{
                            fontSize: '10px',
                            fontWeight: activeTab === tab.id ? '600' : '400',
                            color: activeTab === tab.id ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)'
                        }}
                    >
                        {tab.label}
                    </span>
                </button>
            ))}
        </nav>
    );
}

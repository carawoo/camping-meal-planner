import React from 'react';
import Card from './Card';
import { allergens as allergenLabels } from '../data/meals';

const MealCard = ({ meal, onSwap, peopleCount, isFavorite, onToggleFavorite, onViewMeal }) => {
    const handleBuy = (platform) => {
        const baseUrl = platform === 'coupang'
            ? 'https://www.coupang.com/np/search?component=&q='
            : 'https://search.shopping.naver.com/search/all?query=';

        window.open(`${baseUrl}${encodeURIComponent(meal.searchQuery)}`, '_blank');
    };

    const formatPrice = (price) => {
        return `₩${price.toLocaleString()}`;
    };

    return (
        <div className="meal-card" onClick={onViewMeal} style={{ cursor: 'pointer' }}>
            {/* Image */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                    src={meal.image}
                    alt={meal.title}
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite && onToggleFavorite();
                    }}
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <span style={{
                        fontSize: '20px',
                        lineHeight: 1,
                        color: isFavorite ? 'var(--color-accent-primary)' : 'rgba(255, 255, 255, 0.8)',
                        filter: isFavorite ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none'
                    }}>
                        {isFavorite ? '❤️' : '🤍'}
                    </span>
                </button>
            </div>

            <div style={{ padding: '20px' }}>
                {/* Title & Price */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '8px',
                    gap: '12px'
                }}>
                    <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        letterSpacing: '-0.02em',
                        flex: 1
                    }}>
                        {meal.title}
                    </h3>
                    <div style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        whiteSpace: 'nowrap'
                    }}>
                        {formatPrice(meal.price)}
                    </div>
                </div>

                {/* Description */}
                <p style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    marginBottom: '12px'
                }}>
                    {meal.description}
                </p>

                {/* Quick Info */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '16px',
                    fontSize: '0.8125rem',
                    color: 'var(--color-text-light)'
                }}>
                    <span>{meal.cookingTime}분</span>
                    <span>•</span>
                    <span>{meal.servings}인분</span>
                    {meal.spicyLevel > 0 && (
                        <>
                            <span>•</span>
                            <span>매운맛 {meal.spicyLevel}/5</span>
                        </>
                    )}
                </div>

                {/* Swap Button (if in timeline) */}
                {onSwap && (
                    <button
                        className="btn btn-secondary"
                        onClick={onSwap}
                        style={{ width: '100%', marginBottom: '12px' }}
                    >
                        🔄 다른 메뉴로 변경
                    </button>
                )}

                {/* Buy Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleBuy('coupang')}
                        style={{ width: '100%', padding: '10px 16px', fontSize: '0.875rem' }}
                    >
                        쿠팡
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => handleBuy('naver')}
                        style={{ width: '100%', padding: '10px 16px', fontSize: '0.875rem' }}
                    >
                        네이버
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MealCard;

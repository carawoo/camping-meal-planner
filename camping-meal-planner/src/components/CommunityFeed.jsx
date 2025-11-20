import { useState } from 'react';
import { mockRecommendations, formatTimeAgo } from '../data/communityData';

export default function CommunityFeed({ isOpen, onClose, onOpenForm, isModal = true }) {
    const [userRecommendations, setUserRecommendations] = useState(() => {
        const saved = localStorage.getItem('camping_recommendations');
        return saved ? JSON.parse(saved) : [];
    });

    const [likedPosts, setLikedPosts] = useState(() => {
        const saved = localStorage.getItem('camping_liked_posts');
        return saved ? JSON.parse(saved) : [];
    });

    // Combine mock and user recommendations
    const allPosts = [...userRecommendations, ...mockRecommendations];
    // Sort by likes (descending), then by timestamp (descending)
    const sortedPosts = [...allPosts].sort((a, b) => {
        if (b.likes !== a.likes) {
            return b.likes - a.likes; // Higher likes first
        }
        return b.timestamp - a.timestamp; // More recent first if likes are equal
    });

    const handleLike = (postId) => {
        const newLiked = likedPosts.includes(postId)
            ? likedPosts.filter(id => id !== postId)
            : [...likedPosts, postId];

        setLikedPosts(newLiked);
        localStorage.setItem('camping_liked_posts', JSON.stringify(newLiked));
    };

    if (!isOpen) return null;

    const content = (
        <div className={`community-content ${isModal ? 'modal-content community-modal' : 'inline-content'}`} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
                <h2>🍽️ 커뮤니티 추천</h2>
                {isModal && <button className="modal-close" onClick={onClose}>×</button>}
            </div>

            <div className="modal-body">
                <div className="community-feed">
                    {sortedPosts.length === 0 ? (
                        <div className="empty-feed">
                            <p>아직 추천이 없습니다.</p>
                            <p className="hint">첫 추천을 등록해보세요!</p>
                        </div>
                    ) : (
                        sortedPosts.map(post => (
                            <div key={post.id} className="community-post">
                                <div className="post-header">
                                    <div className="post-author">
                                        <span className="author-emoji">{post.authorEmoji}</span>
                                        <span className="author-name">{post.author}</span>
                                        {!post.isMock && <span className="author-badge">나</span>}
                                    </div>
                                    <span className="post-time">{formatTimeAgo(post.timestamp)}</span>
                                </div>

                                <h3 className="post-title">{post.title}</h3>

                                <div className="post-meals">
                                    {post.mealNames.map((name, idx) => (
                                        <span key={idx} className="post-meal-tag">{name}</span>
                                    ))}
                                </div>

                                <p className="post-description">{post.description}</p>

                                <div className="post-footer" style={{ justifyContent: 'space-between' }}>
                                    {!post.isMock ? (
                                        <button
                                            className="post-delete-btn"
                                            onClick={() => {
                                                if (window.confirm('정말 이 추천을 삭제하시겠습니까?')) {
                                                    const newRecommendations = userRecommendations.filter(r => r.id !== post.id);
                                                    setUserRecommendations(newRecommendations);
                                                    localStorage.setItem('camping_recommendations', JSON.stringify(newRecommendations));
                                                }
                                            }}
                                        >
                                            🗑️ 삭제
                                        </button>
                                    ) : (
                                        <div></div> /* Spacer */
                                    )}
                                    <button
                                        className={`post-like-btn ${likedPosts.includes(post.id) ? 'liked' : ''}`}
                                        onClick={() => handleLike(post.id)}
                                    >
                                        👍 {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

    if (isModal) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                {content}
            </div>
        );
    }

    return content;
}

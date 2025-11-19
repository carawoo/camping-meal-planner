// Mock community recommendations
export const mockRecommendations = [
    {
        id: 'mock1',
        author: '캠핑마스터',
        authorEmoji: '🏕️',
        title: '가족 캠핑 단골 세트',
        mealNames: ['삼겹살 세트', '라면 + 김밥'],
        description: '우리 가족 단골 조합이에요! 저녁에 삼겹살 구워먹고 다음날 아침 간단하게 라면김밥으로 마무리. 완벽합니다 👍',
        likes: 42,
        timestamp: Date.now() - 86400000, // 1일 전
        isMock: true
    },
    {
        id: 'mock2',
        author: '김캠퍼',
        authorEmoji: '😊',
        title: '카레+빵 조합 강추!',
        mealNames: ['캠핑 카레', '바게트 샌드위치'],
        description: '카레를 빵에 찍어먹으면 진짜 맛있어요! 바게트가 카레 국물 흡수 잘 되고, 식사도 든든하고 일석이조예요 🍛🥖',
        likes: 28,
        timestamp: Date.now() - 172800000, // 2일 전
        isMock: true
    },
    {
        id: 'mock3',
        author: '솔로캠핑러',
        authorEmoji: '⛺',
        title: '혼캠 완벽 조합',
        mealNames: ['치킨 + 맥주', '컵라면 & 주먹밥'],
        description: '혼자 캠핑 갈 때 딱이에요. 첫날 치맥으로 힐링하고, 다음날 아침은 간단하게! 양도 딱 좋고 남는 것도 없어요.',
        likes: 35,
        timestamp: Date.now() - 259200000, // 3일 전
        isMock: true
    },
    {
        id: 'mock4',
        author: '요리왕',
        authorEmoji: '👨‍🍳',
        title: '스페인 감성 세트',
        mealNames: ['감바스 알 아히요', '파에야'],
        description: '캠핑에서 스페인 요리 도전! 감바스는 빵에 찍어먹고 파에야는 메인으로. 분위기 완전 좋아요. 와인 필수 🍷',
        likes: 19,
        timestamp: Date.now() - 432000000, // 5일 전
        isMock: true
    },
    {
        id: 'mock5',
        author: '초보캠퍼',
        authorEmoji: '🔰',
        title: '초보 추천 조합',
        mealNames: ['떡볶이 밀키트', '김밥 세트'],
        description: '캠핑 처음이라 간단한 거로 시작했어요. 떡볶이는 밀키트라 쉽고, 김밥은 미리 싸가면 편해요. 초보분들께 추천!',
        likes: 51,
        timestamp: Date.now() - 604800000, // 7일 전
        isMock: true
    }
];

// Helper function to format timestamp
export function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
}

import { useState } from 'react';

export default function TripPlanner({ onPlanComplete }) {
    const [tripPlan, setTripPlan] = useState({
        duration: null,
        people: null,
        arrivalTime: null
    });

    const handleSelect = (field, value) => {
        const newPlan = { ...tripPlan, [field]: value };
        setTripPlan(newPlan);
    };

    const isComplete = tripPlan.duration && tripPlan.people && tripPlan.arrivalTime;

    const handleSubmit = () => {
        if (isComplete) {
            onPlanComplete(tripPlan);
        }
    };

    return (
        <div className="trip-planner">
            {/* 기간 선택 */}
            <section className="trip-section">
                <h3>📅 몇 박?</h3>
                <div className="trip-options">
                    <button
                        className={`trip-option ${tripPlan.duration === '1night' ? 'selected' : ''}`}
                        onClick={() => handleSelect('duration', '1night')}
                    >
                        <span className="trip-option-label">1박2일</span>
                    </button>
                    <button
                        className={`trip-option ${tripPlan.duration === '2nights' ? 'selected' : ''}`}
                        onClick={() => handleSelect('duration', '2nights')}
                    >
                        <span className="trip-option-label">2박3일</span>
                    </button>
                    <button
                        className={`trip-option ${tripPlan.duration === '3nights' ? 'selected' : ''}`}
                        onClick={() => handleSelect('duration', '3nights')}
                    >
                        <span className="trip-option-label">3박4일</span>
                    </button>
                </div>
            </section>

            {/* 인원 선택 */}
            <section className="trip-section">
                <h3>👥 몇 명?</h3>
                <div className="trip-options">
                    <button
                        className={`trip-option ${tripPlan.people === '1-2' ? 'selected' : ''}`}
                        onClick={() => handleSelect('people', '1-2')}
                    >
                        <span className="trip-option-label">1-2명</span>
                    </button>
                    <button
                        className={`trip-option ${tripPlan.people === '3-4' ? 'selected' : ''}`}
                        onClick={() => handleSelect('people', '3-4')}
                    >
                        <span className="trip-option-label">3-4명</span>
                    </button>
                    <button
                        className={`trip-option ${tripPlan.people === '5+' ? 'selected' : ''}`}
                        onClick={() => handleSelect('people', '5+')}
                    >
                        <span className="trip-option-label">5명+</span>
                    </button>
                </div>
            </section>

            {/* 도착 시간 선택 */}
            <section className="trip-section">
                <h3>⏰ 도착 시간?</h3>
                <div className="trip-options">
                    <button
                        className={`trip-option ${tripPlan.arrivalTime === 'lunch-before' ? 'selected' : ''}`}
                        onClick={() => handleSelect('arrivalTime', 'lunch-before')}
                    >
                        <span className="trip-option-label">점심 전</span>
                        <span className="trip-option-time">~12시</span>
                    </button>
                    <button
                        className={`trip-option ${tripPlan.arrivalTime === 'lunch-after' ? 'selected' : ''}`}
                        onClick={() => handleSelect('arrivalTime', 'lunch-after')}
                    >
                        <span className="trip-option-label">점심 후</span>
                        <span className="trip-option-time">12~17시</span>
                    </button>
                    <button
                        className={`trip-option ${tripPlan.arrivalTime === 'dinner' ? 'selected' : ''}`}
                        onClick={() => handleSelect('arrivalTime', 'dinner')}
                    >
                        <span className="trip-option-label">저녁</span>
                        <span className="trip-option-time">17시~</span>
                    </button>
                </div>
            </section>

            {/* 제출 버튼 */}
            <button
                className={`btn btn-primary trip-submit ${isComplete ? '' : 'disabled'}`}
                onClick={handleSubmit}
                disabled={!isComplete}
            >
                {isComplete ? '식단 추천받기' : '모든 항목을 선택해주세요'}
            </button>
        </div>
    );
}

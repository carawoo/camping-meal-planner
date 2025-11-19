import { useState } from 'react';
import { allergens, dietaryOptions } from '../data/meals';

export default function ProfileModal({ isOpen, onClose, profile, onSave }) {
    const [formData, setFormData] = useState(profile);

    if (!isOpen) return null;

    const handleCheckbox = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>⚙️ 내 프로필 설정</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    {/* 알레르기 정보 */}
                    <section className="profile-section">
                        <h3>🚫 알레르기 정보</h3>
                        <p className="section-description">해당 성분이 포함된 메뉴는 표시되지 않습니다.</p>
                        <div className="checkbox-grid">
                            {Object.entries(allergens).map(([key, label]) => (
                                <label key={key} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={formData.allergies.includes(key)}
                                        onChange={() => handleCheckbox('allergies', key)}
                                    />
                                    <span>{label}</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* 식이 제한 */}
                    <section className="profile-section">
                        <h3>🥗 식이 제한</h3>
                        <p className="section-description">선택한 식단에 맞는 메뉴만 표시됩니다.</p>
                        <div className="checkbox-grid">
                            {Object.entries(dietaryOptions).map(([key, label]) => (
                                <label key={key} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={formData.dietary.includes(key)}
                                        onChange={() => handleCheckbox('dietary', key)}
                                    />
                                    <span>{label}</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* 매운맛 선호도 */}
                    <section className="profile-section">
                        <h3>🌶️ 매운맛 선호도</h3>
                        <p className="section-description">현재: {formData.spicyLevel}/5</p>
                        <input
                            type="range"
                            min="0"
                            max="5"
                            value={formData.spicyLevel}
                            onChange={(e) => setFormData(prev => ({ ...prev, spicyLevel: parseInt(e.target.value) }))}
                            className="spicy-slider"
                        />
                        <div className="slider-labels">
                            <span>안 매움</span>
                            <span>매우 매움</span>
                        </div>
                    </section>

                    {/* 인원 */}
                    <section className="profile-section">
                        <h3>👥 인원</h3>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={formData.servings}
                            onChange={(e) => setFormData(prev => ({ ...prev, servings: parseInt(e.target.value) }))}
                            className="number-input"
                        />
                    </section>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-outline" onClick={onClose}>
                        취소
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

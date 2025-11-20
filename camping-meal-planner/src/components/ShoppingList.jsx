import { useState, useEffect } from 'react';

export default function ShoppingList({ planId, planName, dateRange }) {
    const [shoppingItems, setShoppingItems] = useState({
        meat: [],
        vegetables: [],
        other: []
    });
    const [newItem, setNewItem] = useState({ category: 'meat', name: '', amount: '' });
    const [showAddForm, setShowAddForm] = useState(false);

    // Load shopping list from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(`shopping_list_${planId}`);
        if (saved) {
            try {
                setShoppingItems(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load shopping list:', e);
            }
        } else {
            // Initialize with sample items if no saved data
            setShoppingItems({
                meat: [
                    { id: Date.now() + 1, name: '통삼겹살', amount: '600g', checked: false },
                    { id: Date.now() + 2, name: '돼지삼겹살', amount: '300g', checked: true },
                ],
                vegetables: [
                    { id: Date.now() + 3, name: '양파', amount: '2개', checked: false },
                    { id: Date.now() + 4, name: '대파', amount: '1단', checked: false },
                ],
                other: [
                    { id: Date.now() + 5, name: '김치', amount: '500g', checked: true },
                    { id: Date.now() + 6, name: '소시지', amount: '1팩', checked: false },
                ]
            });
        }
    }, [planId]);

    // Save to localStorage whenever items change
    useEffect(() => {
        if (planId) {
            localStorage.setItem(`shopping_list_${planId}`, JSON.stringify(shoppingItems));
        }
    }, [shoppingItems, planId]);

    const toggleItem = (category, id) => {
        setShoppingItems(prev => ({
            ...prev,
            [category]: prev[category].map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        }));
    };

    const deleteItem = (category, id) => {
        if (confirm('이 항목을 삭제하시겠습니까?')) {
            setShoppingItems(prev => ({
                ...prev,
                [category]: prev[category].filter(item => item.id !== id)
            }));
        }
    };

    const addItem = () => {
        if (!newItem.name.trim()) {
            alert('항목 이름을 입력해주세요.');
            return;
        }

        const item = {
            id: Date.now(),
            name: newItem.name.trim(),
            amount: newItem.amount.trim() || '',
            checked: false
        };

        setShoppingItems(prev => ({
            ...prev,
            [newItem.category]: [...prev[newItem.category], item]
        }));

        setNewItem({ category: 'meat', name: '', amount: '' });
        setShowAddForm(false);
    };

    const getCategoryLabel = (category) => {
        const labels = {
            meat: '육류',
            vegetables: '채소',
            other: '기타'
        };
        return labels[category];
    };

    const getCategoryCount = (category) => {
        return shoppingItems[category].length;
    };

    return (
        <div className="shopping-list">
            <div className="shopping-header">
                <h3 className="shopping-title">장보기 목록</h3>
                {dateRange && (
                    <div className="shopping-date-range">
                        <span className="date-icon">📅</span>
                        <span>{dateRange}</span>
                    </div>
                )}
            </div>

            {Object.keys(shoppingItems).map(category => (
                <div key={category} className="shopping-category">
                    <h4 className="category-title">
                        {getCategoryLabel(category)} ({getCategoryCount(category)})
                    </h4>
                    <div className="shopping-items">
                        {shoppingItems[category].map(item => (
                            <div key={item.id} className={`shopping-item ${item.checked ? 'checked' : ''}`}>
                                <label className="item-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={item.checked}
                                        onChange={() => toggleItem(category, item.id)}
                                    />
                                    <span className="checkbox-custom"></span>
                                </label>
                                <div className="item-details">
                                    <span className="item-name">{item.name}</span>
                                    {item.amount && <span className="item-amount">{item.amount}</span>}
                                </div>
                                <button
                                    className="item-delete"
                                    onClick={() => deleteItem(category, item.id)}
                                    aria-label="삭제"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {!showAddForm && (
                <button
                    className="btn-add-item"
                    onClick={() => setShowAddForm(true)}
                >
                    + 항목 추가
                </button>
            )}

            {showAddForm && (
                <div className="add-item-form">
                    <select
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        className="form-select"
                    >
                        <option value="meat">육류</option>
                        <option value="vegetables">채소</option>
                        <option value="other">기타</option>
                    </select>
                    <input
                        type="text"
                        placeholder="항목 이름"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="수량 (선택)"
                        value={newItem.amount}
                        onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                        className="form-input"
                    />
                    <div className="form-actions">
                        <button className="btn btn-primary" onClick={addItem}>추가</button>
                        <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
}

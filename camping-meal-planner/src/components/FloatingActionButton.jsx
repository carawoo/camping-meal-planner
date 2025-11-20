import React from 'react';

export default function FloatingActionButton({ icon, label, onClick, color = 'primary' }) {
    return (
        <button
            className={`fab-button-extended fab-${color}`}
            onClick={onClick}
            aria-label={label}
        >
            <span className="fab-icon-extended">{icon}</span>
            <span className="fab-label-extended">{label}</span>
        </button>
    );
}

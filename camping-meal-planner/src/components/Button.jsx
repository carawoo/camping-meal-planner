import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    fullWidth = false,
    onClick,
    ...props
}) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const widthClass = fullWidth ? 'w-full' : '';

    // Add w-full utility if not present in index.css, let's add inline style for now or assume utility
    // Actually, let's stick to the class and I'll add a utility for w-full in index.css later if needed, 
    // but for now I will just use inline style for width if fullWidth is true

    const style = fullWidth ? { width: '100%' } : {};

    return (
        <button
            className={`${baseClass} ${variantClass} ${className}`}
            style={style}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

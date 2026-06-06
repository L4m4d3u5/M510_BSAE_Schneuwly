import React from 'react';

interface SecondaryButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'outline' | 'ghost';
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  onClick,
  children,
  type = 'button',
  disabled = false,
  variant = 'outline',
}) => {
  const isGhost = variant === 'ghost';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: 'transparent',
        color: disabled ? '#9e9e9e' : '#1976d2',
        padding: '9px 20px',
        border: isGhost ? 'none' : `1px solid ${disabled ? '#9e9e9e' : '#1976d2'}`,
        borderRadius: '6px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1.4,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'background-color 0.15s',
      }}
      onMouseEnter={(e) => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#e3f2fd';
      }}
      onMouseLeave={(e) => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
      }}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;

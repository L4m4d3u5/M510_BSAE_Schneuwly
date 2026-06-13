import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonShape = 'default' | 'pill' | 'square';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: { backgroundColor: '#1976d2', color: 'white', border: 'none' },
  secondary: { backgroundColor: '#9e9e9e', color: 'white', border: 'none' },
  danger: { backgroundColor: '#d32f2f', color: 'white', border: 'none' },
  warning: { backgroundColor: '#e65100', color: 'white', border: 'none' },
  outline: { backgroundColor: 'transparent', color: '#1976d2', border: '1px solid #1976d2' },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '4px 10px', fontSize: '12px' },
  md: { padding: '8px 18px', fontSize: '14px' },
  lg: { padding: '10px 24px', fontSize: '15px', fontWeight: 'bold' },
};

const shapeStyles: Record<ButtonShape, React.CSSProperties> = {
  default: { borderRadius: '4px' },
  pill: { borderRadius: '20px' },
  square: { borderRadius: '2px' },
};

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  shape = 'default',
  fullWidth = false,
  style,
  children,
  ...rest
}) => {
  const computedStyle: React.CSSProperties = {
    cursor: 'pointer',
    display: 'inline-block',
    width: fullWidth ? '100%' : undefined,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...shapeStyles[shape],
    ...style,
  };

  return (
    <button style={computedStyle} {...rest}>
      {label}
    </button>
  );
};

export default Button;

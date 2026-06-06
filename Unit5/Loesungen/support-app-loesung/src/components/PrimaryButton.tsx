/**
 * PrimaryButton – primäre Aktion (ausgefüllt, blau).
 *
 * Um die Primärfarbe global zu ändern, reicht es, hier den Wert
 * von PRIMARY_COLOR anzupassen. Alle Seiten verwenden dieselbe Komponente.
 */

import { ButtonHTMLAttributes } from 'react';

const PRIMARY_COLOR = '#1565c0';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function PrimaryButton({ label, disabled, ...rest }: PrimaryButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      style={{
        padding: '10px 24px',
        backgroundColor: disabled ? '#b0bec5' : PRIMARY_COLOR,
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        letterSpacing: '0.3px',
      }}
    >
      {label}
    </button>
  );
}

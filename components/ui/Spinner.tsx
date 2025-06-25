'use client';

import React from 'react';

export interface SpinnerProps {
  /**
   * Size of the spinner
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Color of the spinner
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'foreground';

  /**
   * Additional class names
   */
  className?: string;
}

/**
 * Spinner component for loading states
 */
const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorMap = {
    primary: 'text-[color:var(--ai-primary)]',
    secondary: 'text-[color:var(--ai-secondary)]',
    success: 'text-[color:var(--ai-success)]',
    warning: 'text-[color:var(--ai-warning)]',
    danger: 'text-[color:var(--ai-danger)]',
    foreground: 'text-[color:var(--ai-foreground)]',
  };

  return (
    <div className={`${sizeMap[size]} ${colorMap[color]} ${className}`}>
      <svg
        className="animate-spin w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export default Spinner;

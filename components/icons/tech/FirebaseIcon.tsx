import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

const FirebaseIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 351"
      width={size}
      height={size}
      className={`inline-block ${className}`}
      role="img"
      aria-label="Firebase Icon"
    >
      <defs>
        <filter
          id="a"
          width="200%"
          height="200%"
          x="-50%"
          y="-50%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="17.5" />
        </filter>
      </defs>
      <path
        fill="#F5820D"
        d="M0 282.998l2.123-2.972L102.527 89.512l.212-2.017L58.48 4.358C54.77-2.606 44.33-.845 43.114 6.951L0 282.998z"
      />
      <path
        fill="#FCCA3F"
        d="M135.005 150.38l32.955-33.75-32.965-62.93c-3.129-5.957-11.866-5.975-14.962 0L102.42 89.512l32.584 60.868z"
      />
      <path
        fill="#F5820D"
        d="M0 282.998l.962-.968 3.496-1.42 128.477-128 1.628-4.431-32.05-61.074z"
      />
      <path
        fill="#FDE068"
        d="M139.121 347.551l116.275-64.847-33.204-204.495c-1.039-6.398-8.888-8.927-13.468-4.34L0 282.998l115.608 64.548a24.126 24.126 0 0 0 23.513.005"
      />
      <path
        fill="#FCCA3F"
        d="M254.354 282.16L221.402 79.218c-1.03-6.35-7.558-8.977-12.103-4.424L1.29 282.6l114.339 63.908a23.943 23.943 0 0 0 23.334.006l115.392-64.355z"
      />
      <path
        fill="#EB8C00"
        d="M139.12 345.64a24.126 24.126 0 0 1-23.512-.005L.931 282.015l-.93.983 115.607 64.548a24.126 24.126 0 0 0 23.513.005l116.275-64.847-.285-1.752-115.99 64.689z"
      />
    </svg>
  );
};

export default FirebaseIcon;

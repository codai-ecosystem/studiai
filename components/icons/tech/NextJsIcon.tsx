import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

const NextJsIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 180"
      width={size}
      height={size}
      className={`inline-block ${className}`}
      role="img"
      aria-label="Next.js Icon"
    >
      <mask
        height="180"
        id="mask0"
        maskUnits="userSpaceOnUse"
        width="180"
        x="0"
        y="0"
      >
        <circle cx="90" cy="90" fill="white" r="90" />
      </mask>
      <g mask="url(#mask0)">
        <circle cx="90" cy="90" data-circle="true" fill="black" r="90" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="url(#paint0_linear)"
        />
        <rect
          fill="url(#paint1_linear)"
          height="72"
          width="12"
          x="115"
          y="54"
        />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear"
          x1="109"
          x2="144.5"
          y1="116.5"
          y2="160.5"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear"
          x1="121"
          x2="120.799"
          y1="54"
          y2="106.875"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default NextJsIcon;

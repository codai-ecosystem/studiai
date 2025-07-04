import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

const NoSQLIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`inline-block ${className}`}
      role="img"
      aria-label="NoSQL Icon"
    >
      <path
        fill="#4DB33D"
        d="M256 112a144 144 0 10.1 288.1A144 144 0 00256 112z"
      />
      <path
        fill="#3F9C35"
        d="M256 118c84 0 138 68.1 138 138 0 69.9-52 138-138 138-86 0-138-68.1-138-138S172 118 256 118m0-6c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144z"
      />
      <path
        fill="#FFFFFF"
        d="M191 270l20 9.1 25-33.1 36 116 36-116 25 33.1 20-9.1-41-53.1h-80l-41 53.1zm55 5h-32v16h32v-16zm52 0h-32v16h32v-16z"
      />
      <path
        fill="#B8E986"
        d="M362.1 159.9c-5.4-12.8-12.8-24.2-21.8-33.9-3.1-3.3-6.3-6.4-9.7-9.4-10.1-8.7-21.3-15.8-33.4-21-12.4-5.4-25.5-8.8-39-10.2-2.9-.3-5.8-.5-8.8-.6H248c-3 .1-5.9.3-8.8.6-13.5 1.4-26.6 4.8-39 10.2-12.1 5.2-23.3 12.3-33.4 21-3.4 3-6.6 6.1-9.7 9.4-9 9.7-16.4 21.1-21.8 33.9C130 174.5 128 188 128 200h256c0-12-2-25.5-7.3-40.1z"
      />
      <path
        fill="#72BA59"
        d="M368 202v44c0 6.3-.6 12.5-1.8 18.5-4.6 23.7-15.3 44.8-30.2 61.5-20.5 23-49.5 39.4-83.5 42.9-1.9.2-3.9.3-5.9.3-1.5.1-3 .2-4.6.2-1.5 0-3.1-.1-4.6-.2-2-.1-4-.2-5.9-.3-34-3.5-63-19.9-83.5-42.9-14.9-16.7-25.6-37.8-30.2-61.5-1.2-6-1.8-12.2-1.8-18.5v-44h256m8-8H112v52c0 39.7 15.3 75.6 40.2 102.4 22.2 24 52.2 40.8 87.8 44.8 5.3.5 10.7.8 16 .8s10.7-.3 16-.8c35.6-4 65.6-20.8 87.8-44.8 24.9-26.8 40.2-62.7 40.2-102.4v-52z"
      />
    </svg>
  );
};

export default NoSQLIcon;

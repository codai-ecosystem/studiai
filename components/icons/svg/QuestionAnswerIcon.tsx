// filepath: e:\GitHub\cursuri\components\icons\svg\QuestionAnswerIcon.tsx
import React from 'react';
import { IconProps } from '@/types';

const QuestionAnswerIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || "20"}
            height={size || "20"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <path d="M12 8v4"></path>
            <path d="M12 16h.01"></path>
        </svg>
    );
};

export default QuestionAnswerIcon;
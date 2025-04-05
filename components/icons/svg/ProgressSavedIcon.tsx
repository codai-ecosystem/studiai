import React from 'react';

interface IconProps {
    className?: string;
}

export const ProgressSavedIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd"></path>
        </svg>
    );
};

export default ProgressSavedIcon;
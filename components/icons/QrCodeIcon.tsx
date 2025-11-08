
import React from 'react';

export const QrCodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h.01M9 5h.01M13 5h.01M5 9h.01M9 9h.01M5 13h.01M17 5h2v2h-2V5zM17 9h2v2h-2V9zM9 13h4v4H9v-4zM17 13h.01M17 17h.01M13 17h.01M5 17h.01M9 17h.01" />
    </svg>
);

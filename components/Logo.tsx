
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-20 w-20' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="50" r="48" stroke="url(#cyan-glow)" strokeWidth="4"/>
            <path d="M30 30 L70 30 L30 70 L70 70" stroke="url(#purple-glow)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
                <radialGradient id="cyan-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#00ffff"/>
                    <stop offset="100%" stopColor="#22d3ee"/>
                </radialGradient>
                 <linearGradient id="purple-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc"/>
                    <stop offset="100%" stopColor="#a855f7"/>
                </linearGradient>
            </defs>
        </svg>
    </div>
  );
};

export default Logo;

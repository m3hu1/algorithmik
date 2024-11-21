// components/HoverUnderline.tsx
import React from 'react';

type HoverUnderlineProps = {
  children: React.ReactNode;
  className?: string; // Additional styles if needed
};

const HoverUnderline: React.FC<HoverUnderlineProps> = ({ children, className = '' }) => {
  return (
    <span className={`relative group inline-block cursor-default ${className}`}>
      {children}
      <span
        className="absolute left-0 bottom-0 w-0 h-[3.5px] bg-primary transition-all duration-700 group-hover:w-full"
      ></span>
    </span>
  );
};

export default HoverUnderline;

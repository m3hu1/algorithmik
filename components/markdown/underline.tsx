// "use client"

// import React, { useEffect, useState } from 'react';

// type AnimatedUnderlineProps = {
//   children: React.ReactNode;
//   delay?: number;  // Delay in milliseconds before animation starts
//   duration?: number;  // Duration of the animation in milliseconds
//   className?: string;
// };

// const AnimatedUnderline = ({ 
//   children, 
//   delay = 0, 
//   duration = 700,
//   className = '' 
// }: AnimatedUnderlineProps) => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(true);
//     }, delay);

//     return () => clearTimeout(timer);
//   }, [delay]);

//   return (
//     <span className={`relative inline-block ${className}`}>
//       {children}
//       <span
//         className={`absolute left-0 bottom-0 h-[3px] bg-primary transition-all ${
//           isVisible ? 'w-full' : 'w-0'
//         }`}
//         style={{ transitionDuration: `${duration}ms` }}
//       />
//     </span>
//   );
// };

// export default AnimatedUnderline;

"use client"

import React, { useEffect, useState, useRef } from 'react';

type AnimatedUnderlineProps = {
  children: React.ReactNode;
  delay?: number;  // Delay in milliseconds before animation starts
  duration?: number;  // Duration of the animation in milliseconds
  className?: string;
};

const AnimatedUnderline = ({ 
  children, 
  delay = 0, 
  duration = 700,
  className = '' 
}: AnimatedUnderlineProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            
            // Disconnect observer after animation triggers
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '10px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return (
    <span ref={elementRef} className={`relative inline-block ${className}`}>
      {children}
      <span
        className={`absolute left-0 bottom-0 h-[3px] bg-primary transition-all ${
          isVisible ? 'w-full' : 'w-0'
        }`}
        style={{ transitionDuration: `${duration}ms` }}
      />
    </span>
  );
};

export default AnimatedUnderline;
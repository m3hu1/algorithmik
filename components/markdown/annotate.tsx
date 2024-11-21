// "use client"
// import { useEffect, useRef, useState } from 'react';
// import { annotate } from 'rough-notation';
// import type { RoughAnnotation } from 'rough-notation/lib/model';

// type AnnotateProps = {
//   children: React.ReactNode;
//   type?: 'underline' | 'box' | 'circle' | 'highlight' | 'strike-through' | 'crossed-off' | 'bracket';
//   color?: string;
//   strokeWidth?: number;
//   padding?: number;
//   animationDuration?: number;
// };

// export default function Annotate({ 
//   children, 
//   type = 'underline',
//   color = `hsl(var(--primary))`,
//   strokeWidth = 3,
//   padding = 1,
//   animationDuration = 500
// }: AnnotateProps) {
//   const elementRef = useRef<HTMLSpanElement>(null);
//   const annotationRef = useRef<RoughAnnotation | null>(null);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     if (!elementRef.current) return;

//     // Create the annotation but don't show it yet
//     annotationRef.current = annotate(elementRef.current, {
//       type,
//       color,
//       strokeWidth,
//       padding,
//       animationDuration,
//       iterations: 1
//     });

//     // Show/hide based on hover state
//     if (isHovered) {
//       annotationRef.current.show();
//     } else {
//       annotationRef.current.hide();
//     }

//     return () => {
//       if (annotationRef.current) {
//         annotationRef.current.remove();
//       }
//     };
//   }, [type, color, strokeWidth, padding, animationDuration, isHovered]);

//   return (
//     <span 
//       ref={elementRef} 
//       className="inline-block cursor-default"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {children}
//     </span>
//   );
// }

"use client"
import { useEffect, useRef } from 'react';
import { annotate } from 'rough-notation';
import type { RoughAnnotation } from 'rough-notation/lib/model';
type AnnotateProps = {
  children: React.ReactNode;
  type?: 'underline' | 'box' | 'circle' | 'highlight' | 'strike-through' | 'crossed-off' | 'bracket';
  color?: string;
  strokeWidth?: number;
  padding?: number;
  animationDuration?: number;
};
export default function Annotate({ 
  children, 
  type = 'underline',
  color = `hsl(var(--primary))`,
  strokeWidth = 3,
  padding = -1,
  animationDuration = 800
}: AnnotateProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    if (!elementRef.current) return;
    // Create the annotation but don't show it yet
    annotationRef.current = annotate(elementRef.current, {
      type,
      color,
      strokeWidth,
      padding,
      animationDuration,
      iterations: 1
    });
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && annotationRef.current) {
            annotationRef.current.show();
          }
        });
      },
      { threshold: 1.0 }
    );
    // Start observing
    observerRef.current.observe(elementRef.current);
    return () => {
      // Cleanup
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (annotationRef.current) {
        annotationRef.current.remove();
      }
    };
  }, [type, color, strokeWidth, padding, animationDuration]);
  return (
    <span ref={elementRef} className="inline-block">
      {children}
    </span>
  );
}
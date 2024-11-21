// "use client"
// import { useEffect, useRef } from 'react';
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
//   color = 'hsl(var(--primary))',
//   strokeWidth = 2,
//   padding = 1,
//   animationDuration = 800
// }: AnnotateProps) {
//   const elementRef = useRef<HTMLSpanElement>(null);
//   const annotationRef = useRef<RoughAnnotation | null>(null);

//   useEffect(() => {
//     if (!elementRef.current) return;

//     annotationRef.current = annotate(elementRef.current, {
//       type,
//       color,
//       strokeWidth,
//       padding,
//       animationDuration
//     });

//     annotationRef.current.show();

//     return () => {
//       if (annotationRef.current) {
//         annotationRef.current.remove();
//       }
//     };
//   }, [type, color, strokeWidth, padding, animationDuration]);

//   return (
//     <span ref={elementRef} className="inline-block">
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
  padding = 1,
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
      animationDuration
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

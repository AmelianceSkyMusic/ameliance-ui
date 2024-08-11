import { useEffect, useState } from 'react';

const scrollDirections: {
   up: 'up';
   down: 'down';
} = {
   up: 'up',
   down: 'down',
};

interface UseScrollReturn {
   scrollDirection: 'up' | 'down' | 'start';
   scrollPosition: number;
}

export function useScroll(thresholdArg: number, onScroll?: () => void): UseScrollReturn {
   const threshold = thresholdArg ?? 100;
   const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'start'>('start');
   const [scrollPosition, setScrollPosition] = useState<number>(0);

   useEffect(() => {
      let previousScrollYPosition = window.scrollY;

      const scrolledMoreThanThreshold = (currentScrollYPosition: number) =>
         Math.abs(currentScrollYPosition - previousScrollYPosition) > threshold;

      const isScrollingUp = (currentScrollYPosition: number) =>
         currentScrollYPosition > previousScrollYPosition &&
         !(previousScrollYPosition > 0 && currentScrollYPosition === 0) &&
         !(currentScrollYPosition > 0 && previousScrollYPosition === 0);

      const updateScrollDirection = () => {
         const currentScrollYPosition = window.scrollY;
         setScrollPosition(currentScrollYPosition);

         if (scrolledMoreThanThreshold(currentScrollYPosition)) {
            if (onScroll) onScroll();
            const newScrollDirection = isScrollingUp(currentScrollYPosition)
               ? scrollDirections.down
               : scrollDirections.up;
            setScrollDirection(newScrollDirection);
            previousScrollYPosition = currentScrollYPosition > 0 ? currentScrollYPosition : 0;
         }
      };

      const handelOnScroll = () => window.requestAnimationFrame(updateScrollDirection);

      window.addEventListener('scroll', handelOnScroll);

      return () => window.removeEventListener('scroll', handelOnScroll);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return { scrollDirection, scrollPosition };
}

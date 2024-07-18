import { useLayoutEffect, useState } from 'react';

interface UseWindowSizeState {
   windowWidth: number;
   windowHeight: number;
}

export function useWindowSize(): UseWindowSizeState {
   const [windowSize, setWindowSize] = useState<UseWindowSizeState>({
      windowWidth: 0,
      windowHeight: 0,
   });

   useLayoutEffect(() => {
      function updateSize() {
         setWindowSize({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
         });
      }

      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
   }, []);

   return windowSize;
}

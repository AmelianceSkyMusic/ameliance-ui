import { useEffect, useState } from 'react';

import { useScroll } from '../../..hooks-use-scroll';
import { useWindowSize } from '../../..hooks-use-window-size';

import c from '.sticky-button.module.scss';

interface StickyButton {
   children: React.ReactNode;
   popup?: boolean;
   inverseDirection?: boolean;
   hideOnScreensCount?: number;
}

export function StickyButton({
   children,
   popup,
   inverseDirection,
   hideOnScreensCount = 0,
}: StickyButton) {
   const [animationClass, setAnimationClass] = useState(c.hide);

   // const [animationClass, setAnimationClass] = useState(initHide ? c.hide : '');

   // useEffect(() => {
   // 	setAnimationClass((prev) => asm.join(c.initAnimation, prev));
   // }, []);
   const { windowHeight } = useWindowSize();

   const { scrollDirection, scrollPosition } = useScroll(200);

   useEffect(() => {
      const isScreenHide = scrollPosition > windowHeight * hideOnScreensCount;

      if (isScreenHide && inverseDirection && scrollDirection === 'up') {
         setAnimationClass(c.show);
      } else if (isScreenHide && inverseDirection && scrollDirection === 'down') {
         setAnimationClass(c.hide);
      } else if (isScreenHide && scrollDirection === 'up') {
         setAnimationClass(c.hide);
      } else if (isScreenHide && scrollDirection === 'down') {
         setAnimationClass(c.show);
      } else {
         setAnimationClass(c.hide);
      }
   }, [hideOnScreensCount, inverseDirection, scrollDirection, scrollPosition, windowHeight]);

   return <div className={asm.join(c.StickyButton, popup && animationClass)}>{children}</div>;
}

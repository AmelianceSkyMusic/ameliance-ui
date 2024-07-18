import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import c from './loader-counter.module.scss';
import { join } from 'ameliance-scripts/scripts/join';
import { setIntervalCounts } from 'ameliance-scripts/scripts/setIntervalCounts';

interface LoaderCounter {
   timer: number;
   isInversion?: boolean;
}

export function LoaderCounter({ timer, isInversion }: LoaderCounter) {
   const [counter, setCounter] = useState(timer / 1000);

   useEffect(() => {
      setIntervalCounts({
         callback: () => setCounter((prev) => prev - 1),
         delay: 1000,
         counts: timer / 1000,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const refAnimation = useRef<HTMLDivElement>(null);

   useLayoutEffect(() => {
      refAnimation.current?.style.setProperty('--loader-counter--animation-duration', `${timer}ms`);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [timer]);

   return (
      <div className={join(c.LoaderCounter, isInversion ? c.inversion : c.normal)}>
         <div className={c.background} />
         <div className={c.animation} ref={refAnimation} />
         <p className={join(c.counter, 'p2')}>{counter}</p>
      </div>
   );
}

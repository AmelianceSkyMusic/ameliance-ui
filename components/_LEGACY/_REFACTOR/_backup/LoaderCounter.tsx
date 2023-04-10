import {
	useEffect, useLayoutEffect, useRef, useState,
} from 'react';

import asm from 'asm-ts-scripts';

import s from './LoaderCounter.module.scss';

interface LoaderCounter {
	timer: number;
	isInversion?: boolean;
}

export function LoaderCounter({ timer, isInversion }: LoaderCounter) {
	const [counter, setCounter] = useState(timer / 1000);

	useEffect(() => {
		asm.setIntervalCounts({
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
		<div className={asm.join(s.LoaderCounter, isInversion ? s.inversion : s.normal)}>
			<div className={s.background} />
			<div className={s.animation} ref={refAnimation} />
			<p className={asm.join(s.counter, 'p2')}>
				{counter}
			</p>
		</div>
	);
}

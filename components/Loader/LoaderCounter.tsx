import {
	forwardRef, useEffect, useLayoutEffect, useRef, useState,
} from 'react';

import asm from 'asm-ts-scripts';

import { Typography } from '../Typography';

import s from './LoaderCounter.module.scss';

export type LoaderCounterElement = HTMLDivElement;

export interface LoaderCounterProps extends ReactHTMLElementAttributes<LoaderCounterElement> {
	timer: number;
	isInversion?: boolean;
}

export const LoaderCounter = forwardRef<LoaderCounterElement, LoaderCounterProps>(({
	timer,
	isInversion,
	className,
	...rest
}, ref) => {
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

	const componentClass = [
		isInversion ? s.inversion : s.normal,
	];

	return (
		<div
			className={asm.join(s.LoaderCounter, className, componentClass)}
			ref={ref}
			{...rest}
		>
			<div className={s.background} />
			<div className={s.animation} ref={refAnimation} />
			<Typography component="p2" className={s.counter}>
				{counter}
			</Typography>
		</div>
	);
});

LoaderCounter.displayName = 'LoaderCounter';

import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { join } from 'ameliance-scripts';
import { setIntervalCounts } from 'ameliance-scripts';

import { Typography } from '../typography';

import c from './loader-counter.module.scss';

export type LoaderCounterElement = HTMLDivElement;

export type LoaderCounterProps = React.ComponentPropsWithoutRef<'div'> & {
	timer: number;
	isInversion?: boolean;
};

export const LoaderCounter = forwardRef<LoaderCounterElement, LoaderCounterProps>(
	({ timer, isInversion, className, ...rest }, ref) => {
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
			refAnimation.current?.style.setProperty(
				'--a--loader-counter--animation-duration',
				`${timer}ms`,
			);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [timer]);

		const componentClass = [isInversion ? c.inversion : c.normal];

		return (
			<div className={join(c.root, className, componentClass)} ref={ref} {...rest}>
				<div className={c.background} />
				<div className={c.animation} ref={refAnimation} />
				<Typography component="p2" className={c.counter}>
					{counter}
				</Typography>
			</div>
		);
	},
);

LoaderCounter.displayName = 'LoaderCounter';

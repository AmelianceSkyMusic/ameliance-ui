import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './LoaderBars.module.scss';

export type LoaderBarsElement = HTMLDivElement;

export type LoaderBarsProps = ReactHTMLElementAttributes<LoaderBarsElement>;

export const LoaderBars = forwardRef<LoaderBarsElement, LoaderBarsProps>(({
	className,
	...rest
}, ref) => (
	<div
		className={asm.join(s.LoaderBars, className)}
		ref={ref}
		{...rest}
	>
		<div />
		<div />
		<div />
	</div>
));

LoaderBars.displayName = 'LoaderBars';

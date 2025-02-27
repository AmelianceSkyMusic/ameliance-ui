import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import c from './loader-line.module.scss';

export type LoaderLineElement = HTMLDivElement;

export type LoaderLineProps = React.ComponentPropsWithoutRef<'div'> & {
	isInversion?: boolean;
};

export const LoaderLine = forwardRef<LoaderLineElement, LoaderLineProps>(
	({ isInversion, className, ...rest }, ref) => {
		const componentClass = [isInversion ? c.inversion : c.normal];

		return (
			<div className={join(c.root, className, componentClass)} ref={ref} {...rest}>
				<div className={c.background} />
				<div className={c.animation} />
			</div>
		);
	},
);

LoaderLine.displayName = 'LoaderLine';

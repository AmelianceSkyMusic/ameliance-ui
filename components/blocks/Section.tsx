import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import { getGridClass } from './helpers/grid';
import type { Grid } from './types/Grid';

export type SectionElement = HTMLElement;

export interface SectionProps extends ReactHTMLElementAttributes<SectionElement> {
	container?: boolean;
	gridContainer?: boolean;
	grid?: Grid;
}

export const Section = forwardRef<SectionElement, SectionProps>(({
	gridContainer,
	grid,
	children,
	className,
	...rest
}, ref) => {
	const componentClass = [
		grid && getGridClass(grid),
	];

	return (
		<section
			className={asm.join(className, gridContainer && 'row', componentClass)}
			ref={ref}
			{...rest}
		>
			{children}
		</section>
	);
});

Section.displayName = 'Section';

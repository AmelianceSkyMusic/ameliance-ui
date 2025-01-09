import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import { getGridClass } from './helpers/grid';
import type { Grid } from './types/grid';

export type SectionElement = HTMLElement;

export type SectionProps = React.ComponentPropsWithoutRef<'section'> & {
	container?: boolean;
	gridContainer?: boolean;
	grid?: Grid;
};

export const Section = forwardRef<SectionElement, SectionProps>(
	({ gridContainer, grid, children, className, ...rest }, ref) => {
		const componentClass = [grid && getGridClass(grid)];

		return (
			<section
				className={join(className, gridContainer && 'row', componentClass)}
				ref={ref}
				{...rest}
			>
				{children}
			</section>
		);
	},
);

Section.displayName = 'Section';

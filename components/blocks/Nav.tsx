import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import { getGridClass } from './helpers/grid';
import type { Grid } from './types/Grid';

export type NavElement = HTMLElement;
export interface NavProps extends ReactHTMLElementAttributes<NavElement> {
	gridContainer?: boolean;
	grid?: Grid;
}

export const Nav = forwardRef<NavElement, NavProps>(({
	gridContainer,
	grid,
	children,
	className,
	...rest
}, ref) => {
	const gridClass = grid && getGridClass(grid);

	return (
		<nav
			className={asm.join(className, gridContainer && 'row', gridClass)}
			ref={ref}
			{...rest}
		>
			{children}
		</nav>
	);
});

Nav.displayName = 'Nav';

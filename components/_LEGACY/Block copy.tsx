import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import type { Grid } from './helpers/grid';
import { getGridClass } from './helpers/grid';

type ComponentElementType = HTMLDivElement;

interface Block extends ReactHTMLElementAttributes<ComponentElementType> {
	gridContainer?: boolean;
	grid?: Grid;
}

export const Block = forwardRef<ComponentElementType, Block>(({
	gridContainer,
	grid,
	children,
	className,
	...rest
}, ref) => {
	const gridClass = grid && getGridClass(grid);

	return (
		<div
			className={asm.join(className, gridContainer && 'row', gridClass)}
			ref={ref}
			{...rest}
		>
			{children}
		</div>
	);
});

Block.displayName = 'Block';

import type { ComponentProps, ElementType } from 'react';
import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import { Component } from '../_LAB/Component';
import { getGridClass } from './helpers/grid';
import type { Grid } from './types/Grid';

export type BlockElement = ComponentProps<ElementType>;

export interface BlockProps extends ReactHTMLElementAttributes<BlockElement> {
	component?: ElementType;
	grid?: Grid;
}

export const Block = forwardRef<BlockElement, BlockProps>(({
	component = 'div',
	grid,
	children,
	className,
	...rest
}, ref) => {
	const gridClass = grid && getGridClass(grid);

	const attributes	= {
		className: asm.join(className, gridClass),
		ref,
		...rest,
	};

	return (<Component as={component} {...attributes}>{children}</Component>);
});

Block.displayName = 'Block';

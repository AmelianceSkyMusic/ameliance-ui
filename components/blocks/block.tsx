import type { ComponentProps, ElementType } from 'react';
import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import { Component } from '../_LAB/component';
import type { ReactHTMLElementAttributes } from '../types/react-html-element-attributes';
import { getGridClass } from './helpers/grid';
import type { Grid } from './types/grid';

export type BlockElement = ComponentProps<ElementType>;

export type BlockProps = {
	component?: ElementType;
	grid?: Grid;
} & Omit<ReactHTMLElementAttributes<BlockElement>, 'ref'>;

export const Block = forwardRef<BlockElement, BlockProps>(
	({ component = 'div', grid, children, className, ...rest }, ref) => {
		const gridClass = grid && getGridClass(grid);

		const attributes = {
			className: join(className, gridClass),
			ref,
			...rest,
		};

		return (
			<Component as={component} {...attributes}>
				{children}
			</Component>
		);
	},
);

Block.displayName = 'Block';

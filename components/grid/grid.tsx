import type { ElementType } from 'react';
import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { ComponentElement, ComponentProps } from '../_LAB/component';
import { Component } from '../_LAB/component';

export type GridElement = ComponentElement;

export type GridProps = {
	component?: ElementType;
	container?: boolean;
	row?: boolean;
} & ComponentProps;

export const Grid = forwardRef<GridElement, GridProps>(
	({ container, row, component = 'div', children, className, ...rest }, ref) => {
		const componentClass = [container && 'container', row && 'row'];

		return (
			<Component as={component} className={join(className, componentClass)} ref={ref} {...rest}>
				{children}
			</Component>
		);
	},
);

Grid.displayName = 'Grid';

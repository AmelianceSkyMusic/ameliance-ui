import type { ElementType } from 'react';
import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import type { ComponentElementType, ComponentProps } from '../_LAB/Component';
import { Component } from '../_LAB/Component';

export type GridElement = ComponentElementType;

export interface GridProps extends ComponentProps {
	component?: ElementType;
	container?: boolean;
	row?: boolean;
}

export const Grid = forwardRef<GridElement, GridProps>(({
	container,
	row,
	component = 'div',
	children,
	className,
	...rest
}, ref) => {
	const componentClass = [
		container && 'container',
		row && 'row',
	];

	return (
		<Component
			as={component}
			className={asm.join(className, componentClass)}
			ref={ref}
			{...rest}
		>
			{children}
		</Component>
	);
});

Grid.displayName = 'Grid';

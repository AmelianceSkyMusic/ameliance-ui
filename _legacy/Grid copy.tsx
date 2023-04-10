import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

type ComponentElementType = HTMLDivElement;

interface Grid extends ReactHTMLElementAttributes<ComponentElementType> {
	container?: boolean;
	row?: boolean;
}

export const Grid = forwardRef<ComponentElementType, Grid>(({
	container,
	row,
	children,
	className,
	...rest
}, ref) => {
	const componentClass = [
		container ? 'container' : 'row',
		container && row && 'container row',
	];

	return (
		<div
			className={asm.join(className, componentClass)}
			ref={ref}
			{...rest}
		>
			{children}
		</div>
	);
});

Grid.displayName = 'Grid';

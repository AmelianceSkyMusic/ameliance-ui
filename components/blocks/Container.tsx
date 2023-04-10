import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

export type ContainerElement = HTMLDivElement;

interface Container extends ReactHTMLElementAttributes<ContainerElement> {
	gridContainer?: boolean;
}

export const Container = forwardRef<ContainerElement, Container>(({
	gridContainer,
	children,
	className,
	...rest
}, ref) => (
	<div
		className={asm.join(className, 'container', gridContainer && 'row')}
		ref={ref}
		{...rest}
	>
		{children}
	</div>
));

Container.displayName = 'Container';

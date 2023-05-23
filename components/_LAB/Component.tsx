import type { ElementType, HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export type ComponentElementType = HTMLOrSVGElement;

export interface ComponentProps extends HTMLAttributes<ComponentElementType> {
	as?: ElementType;
}

export const Component = forwardRef<ComponentElementType, ComponentProps>(({
	as: Tag = 'div',
	children,
	className,
	...rest
}, ref) => (
	<Tag
		className={className}
		ref={ref}
		{...rest}
	>
		{children}
	</Tag>
));

Component.displayName = 'Component';

import type { ElementType, HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export type ComponentElement = HTMLOrSVGElement;

export type ComponentProps = {
	as?: ElementType;
} & HTMLAttributes<ComponentElement>;

export const Component = forwardRef<ComponentElement, ComponentProps>(
	({ as: Tag = 'div', children, className, ...rest }, ref) => (
		<Tag className={className} ref={ref} {...rest}>
			{children}
		</Tag>
	),
);

Component.displayName = 'Component';

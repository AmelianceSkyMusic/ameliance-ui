import type { ElementType, HTMLAttributes } from 'react';

export interface ComponentProps extends HTMLAttributes<HTMLOrSVGElement> {
	as?: ElementType;
}

export function Component({ as: Tag = 'div', ...rest }: ComponentProps) {
	return <Tag {...rest} />;
}

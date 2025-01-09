import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type {
	LinkElement as LinkComponentElement,
	LinkProps as LinkComponentProps,
} from '../../../link';
import { Link as LinkComponent } from '../../../link';

import c from './link.module.scss';

export type LinkElement = LinkComponentElement;

export type LinkProps = LinkComponentProps;

export const Link = forwardRef<LinkElement, LinkProps>(
	({ component, className, children, ...rest }, ref) => {
		return (
			<LinkComponent
				component={component}
				className={join(c.root, className)}
				ref={ref}
				{...rest}
			>
				{children}
			</LinkComponent>
		);
	},
);

Link.displayName = 'Link';

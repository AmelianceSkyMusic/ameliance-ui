import type { ElementType } from 'react';
import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import { Component } from '../_LAB/component';
import type { ComponentSizesLegacy } from '../types/component-sizes-legacy';

import typography from '../typography/typography.module.scss';
import c from './button.module.scss';

export type ButtonLinkElement = HTMLAnchorElement;

export type ButtonLinkProps = React.ComponentPropsWithoutRef<'a'> & {
	component?: ElementType;
	size?: ComponentSizesLegacy;
	disabled?: boolean;
	type?: 'primary' | 'secondary' | 'text';
	blank?: boolean;
};

export const ButtonLink = forwardRef<ButtonLinkElement, ButtonLinkProps>(
	(
		{ component = 'a', size = 'default', type = 'primary', blank, children, className, ...rest },
		ref,
	) => {
		// *----- check is icon should be button icon  -----
		const hasLabel = Array.isArray(children)
			? children?.some((child) => typeof child === 'string')
			: typeof children === 'string';

		const sizeClass = size && c[size];

		const componentClass = [type && c[type], !hasLabel && c.icon];

		const blankAttributes = blank && {
			target: '_blank',
			rel: 'noreferrer noopener',
		};

		const attributes = {
			className: join(c.root, className, sizeClass, componentClass),
			...blankAttributes,
			...rest,
			ref,
		};

		return (
			<Component as={component} {...attributes}>
				<span className={join(c.label, typography.button, sizeClass)}>{children}</span>
			</Component>
		);
	},
);

ButtonLink.displayName = 'ButtonLink';

import type { ElementType } from 'react';
import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import { Component } from '../_LAB/component';
import type { TypographyVariants } from '../typography';

import typography from '../typography/typography.module.scss';
import c from './link.module.scss';

export type LinkElement = HTMLAnchorElement;

export type LinkProps = React.ComponentPropsWithRef<'a'> & {
	component?: ElementType;
	display?: TypographyVariants;
	underline?: boolean;
	hover?: boolean;
	blank?: boolean;
	active?: boolean;
	disabled?: boolean;
};

export const Link = forwardRef<LinkElement, LinkProps>(
	(
		{
			component = 'a',
			display,
			underline,
			hover = true,
			active,
			disabled,
			children,
			blank,
			className,
			...rest
		},
		ref,
	) => {
		const componentClass = [
			display ? typography[display] : typography.link,
			underline === false && c.noUnderline,
			hover && c.hover,
			active && c.active,
			disabled && c.disabled,
		];

		const blankAttributes = blank && {
			target: '_blank',
			rel: 'noreferrer noopener',
		};

		const attributes = {
			className: join(c.root, className, componentClass),
			...blankAttributes,
			...rest,
			ref,
		};

		return (
			<Component as={component} {...attributes}>
				{children}
			</Component>
		);
	},
);

Link.displayName = 'Link';

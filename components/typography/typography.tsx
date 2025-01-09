import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import { Component } from '../_LAB/component';
import type { TypographyVariants as TypographyVariantsType } from './types/typography-variants';

import c from './typography.module.scss';

export type TypographyVariants = TypographyVariantsType;

export type TypographyElement = HTMLHeadingElement | HTMLParagraphElement;

export type TypographyProps = React.ComponentPropsWithoutRef<'h1'> &
	React.ComponentPropsWithoutRef<'h2'> &
	React.ComponentPropsWithoutRef<'h3'> &
	React.ComponentPropsWithoutRef<'h4'> &
	React.ComponentPropsWithoutRef<'h5'> &
	React.ComponentPropsWithoutRef<'h6'> &
	React.ComponentPropsWithoutRef<'p'> & {
		component?: TypographyVariants;
		display?: TypographyVariants;
	};

const tag = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
};

export const Typography = forwardRef<TypographyElement, TypographyProps>(
	({ component, display, children, className, ...rest }, ref) => {
		const componentTag = component || 'p';
		const displayClass = display ? c[display] : null;
		const componentClass = component ? c[component] : c.p1;

		const attributes = {
			className: join(className, displayClass || componentClass),
			ref,
			...rest,
		};

		const tagType = tag[componentTag as keyof typeof tag] || 'p';

		return (
			<Component as={tagType as keyof typeof tag} {...attributes}>
				{children}
			</Component>
		);
	},
);

Typography.displayName = 'Typography';

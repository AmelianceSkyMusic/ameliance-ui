import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import { Component } from '../_LAB/Component';

import s from './Typography.module.scss';

export type TypographyElement = HTMLHeadingElement | HTMLParagraphElement;

export interface TypographyProps extends ReactHTMLElementAttributes<TypographyElement> {
	component?: TypographyVariants;
	display?: TypographyVariants;
}

const tag = {
	h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
};

export const Typography = forwardRef<TypographyElement, TypographyProps>(({
	component,
	display,
	children,
	className,
	...rest
}, ref) => {
	const componentTag = component || 'p';
	const displayClass = display ? s[display] : null;
	const componentClass = component ? s[component] : s.p1;

	const attributes = {
		className: asm.join(className, displayClass || componentClass),
		ref,
		...rest,
	};

	const tagType = tag[componentTag as keyof typeof tag] || 'p';

	return (<Component as={tagType as keyof typeof tag} {...attributes}>{children}</Component>);
});

Typography.displayName = 'Typography';

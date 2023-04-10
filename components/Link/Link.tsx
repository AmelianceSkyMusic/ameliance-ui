import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import typography from '../Typography/Typography.module.scss';
import s from './Link.module.scss';

export type LinkElement = HTMLAnchorElement;

export interface LinkProps extends ReactHTMLElementAttributes<
LinkElement, React.AnchorHTMLAttributes<LinkElement>> {
	display?: TypographyVariants;
	underline?: boolean;
	blank?: boolean;
}

export const Link = forwardRef<LinkElement, LinkProps>(({
	display,
	underline,
	children,
	blank,
	className,
	...rest
}, ref) => {
	// *----- create class from props -----
	const componentClass = [
		display ? typography[display] : typography.link,
		underline === false && s.noUnderline,
	];

	const blankAttributes = blank && {
		target: '_blank',
		rel: 'noreferrer noopener',
	};

	return (
		<a
			className={asm.join(s.Link, className, componentClass)}
			ref={ref}
			{...blankAttributes}
			{...rest}
		>
			{children}
		</a>
	);
});

Link.displayName = 'Link';

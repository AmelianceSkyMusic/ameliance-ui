import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

export type FooterElement = HTMLElement;

export type FooterProps = ReactHTMLElementAttributes<FooterElement>;

export const Footer = forwardRef<FooterElement, FooterProps>(({
	children,
	className,
	...rest
}, ref) => (
	<footer
		className={asm.join(className, 'footer')}
		ref={ref}
		{...rest}
	>
		{children}
	</footer>
));

Footer.displayName = 'Footer';

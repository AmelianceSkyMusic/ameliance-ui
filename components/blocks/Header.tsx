import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

export type HeaderElement = HTMLElement;

export type HeaderProps = ReactHTMLElementAttributes<HeaderElement>;

export const Header = forwardRef<HeaderElement, HeaderProps>(({
	children,
	className,
	...rest
}, ref) => (
	<header
		className={asm.join(className, 'header')}
		ref={ref}
		{...rest}
	>
		{children}
	</header>
));

Header.displayName = 'Header';

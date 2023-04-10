import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

export type MainElement = HTMLElement;

export type MainProps = ReactHTMLElementAttributes<MainElement>;

export const Main = forwardRef<MainElement, MainProps>(({
	children,
	className,
	...rest
}, ref) => (
	<main
		className={asm.join(className, 'main')}
		ref={ref}
		{...rest}
	>
		{children}
	</main>
));

Main.displayName = 'Main';

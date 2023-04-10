import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './MenuContainer.module.scss';

export type MenuContainerElement = HTMLDivElement;

export type MenuContainerProps = ReactHTMLElementAttributes<MenuContainerElement>;

export const MenuContainer = forwardRef<MenuContainerElement, MenuContainerProps>(({
	children,
	className,
	...rest
}, ref) => (
	<div
		className={asm.join(s.MenuContainer, className)}
		ref={ref}
		{...rest}
	>
		{children}
	</div>
));

MenuContainer.displayName = 'MenuContainer';

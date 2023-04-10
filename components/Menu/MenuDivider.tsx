import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './MenuDivider.module.scss';

export type MenuDividerElement = HTMLSpanElement;

export type MenuDividerProps = ReactHTMLElementAttributes<MenuDividerElement>;

export const MenuDivider = forwardRef<MenuDividerElement, MenuDividerProps>(({
	className,
	...rest
}, ref) => (
	<span
		className={asm.join(s.MenuDivider, className)}
		ref={ref}
		{...rest}
	/>
));

MenuDivider.displayName = 'MenuDivider';

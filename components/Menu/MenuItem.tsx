import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './MenuItem.module.scss';

export type MenuItemElement = HTMLLIElement;

export interface MenuItemProps extends ReactHTMLElementAttributes<MenuItemElement> {
	children: React.ReactNode;
	disabled?: boolean;
}

export const MenuItem = forwardRef<MenuItemElement, MenuItemProps>(({
	disabled,
	children,
	className,
	...rest
}, ref) => {
	const componentClass = [
		disabled && s.disabled,
	];

	return (
		<li
			className={asm.join(s.MenuItem, className, componentClass)}
			ref={ref}
			{...rest}
		>
			{children}
		</li>
	);
});

MenuItem.displayName = 'MenuItem';

import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import c from './menu-divider.module.scss';

export type MenuDividerElement = HTMLSpanElement;

export type MenuDividerProps = React.ComponentPropsWithoutRef<'span'>;

export const MenuDivider = forwardRef<MenuDividerElement, MenuDividerProps>(
	({ className, ...rest }, ref) => (
		<span className={join(c.root, className)} ref={ref} {...rest} />
	),
);

MenuDivider.displayName = 'MenuDivider';

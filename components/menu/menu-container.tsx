import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import c from './menu-container.module.scss';

export type MenuContainerElement = HTMLDivElement;

export type MenuContainerProps = React.ComponentPropsWithoutRef<'div'>;

export const MenuContainer = forwardRef<MenuContainerElement, MenuContainerProps>(
	({ children, className, ...rest }, ref) => (
		<div className={join(c.root, className)} ref={ref} {...rest}>
			{children}
		</div>
	),
);

MenuContainer.displayName = 'MenuContainer';

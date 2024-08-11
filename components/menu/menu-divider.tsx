import { forwardRef } from 'react';

import c from './menu-divider.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type MenuDividerElement = HTMLSpanElement;

export type MenuDividerProps = React.ComponentPropsWithoutRef<'span'>;

export const MenuDivider = forwardRef<MenuDividerElement, MenuDividerProps>(
   ({ className, ...rest }, ref) => (
      <span className={join(c.root, className)} ref={ref} {...rest} />
   ),
);

MenuDivider.displayName = 'MenuDivider';

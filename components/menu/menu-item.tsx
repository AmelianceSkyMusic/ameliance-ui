import { forwardRef } from 'react';

import c from './menu-item.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type MenuItemElement = HTMLLIElement;

export type MenuItemProps = React.ComponentPropsWithoutRef<'li'> & {
   children: React.ReactNode;
   disabled?: boolean;
};

export const MenuItem = forwardRef<MenuItemElement, MenuItemProps>(
   ({ disabled, children, className, ...rest }, ref) => {
      const componentClass = [disabled && c.disabled];

      return (
         <li className={join(c.root, className, componentClass)} ref={ref} {...rest}>
            {children}
         </li>
      );
   },
);

MenuItem.displayName = 'MenuItem';

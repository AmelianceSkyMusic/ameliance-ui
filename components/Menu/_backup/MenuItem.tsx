// import { join } from 'ameliance-scripts/scripts/join';

// import c from './menu-item.module.scss';

// interface MenuItem {
// 	children: React.ReactNode;
// 	disabled?: boolean;
// }

// export function MenuItem({ children, disabled }: MenuItem) {
// 	return (
// 		<li className={join(c.MenuItem, disabled && c.disabled)}>{children}</li>
// 	);
// }

import { forwardRef } from 'react';

import { join } from 'ameliance-scripts/scripts/join';

import c from './menu-item.module.scss';

type ComponentElementType = HTMLLIElement;

interface MenuItem extends ReactHTMLElementAttributes<ComponentElementType> {
   children: React.ReactNode;
   disabled?: boolean;
}

export const MenuItem = forwardRef<ComponentElementType, MenuItem>(
   ({ disabled, children, className, ...rest }: MenuItem, ref) => {
      // *----- create class from props -----
      const componentClass = [disabled && c.disabled];

      return (
         <li className={join(c.MenuItem, className, componentClass)} ref={ref} {...rest}>
            {children}
         </li>
      );
   },
);

MenuItem.displayName = 'MenuItem';

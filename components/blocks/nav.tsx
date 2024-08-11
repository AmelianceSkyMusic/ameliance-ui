import { forwardRef } from 'react';

import { getGridClass } from './helpers/grid';
import type { Grid } from './types/grid';

import { join } from 'ameliance-scripts/scripts/join';

export type NavElement = HTMLElement;

export type NavProps = React.ComponentPropsWithoutRef<'nav'> & {
   gridContainer?: boolean;
   grid?: Grid;
};

export const Nav = forwardRef<NavElement, NavProps>(
   ({ gridContainer, grid, children, className, ...rest }, ref) => {
      const gridClass = grid && getGridClass(grid);

      return (
         <nav className={join(className, gridContainer && 'row', gridClass)} ref={ref} {...rest}>
            {children}
         </nav>
      );
   },
);

Nav.displayName = 'Nav';

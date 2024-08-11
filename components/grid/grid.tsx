import type { ElementType } from 'react';
import { forwardRef } from 'react';

import type { ComponentElement, ComponentProps } from '../_LAB/component';
import { Component } from '../_LAB/component';

import { join } from 'ameliance-scripts/scripts/join';

export type GridElement = ComponentElement;

export interface GridProps extends ComponentProps {
   component?: ElementType;
   container?: boolean;
   row?: boolean;
}

export const Grid = forwardRef<GridElement, GridProps>(
   ({ container, row, component = 'div', children, className, ...rest }, ref) => {
      const componentClass = [container && 'container', row && 'row'];

      return (
         <Component as={component} className={join(className, componentClass)} ref={ref} {...rest}>
            {children}
         </Component>
      );
   },
);

Grid.displayName = 'Grid';

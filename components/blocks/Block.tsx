import type { ComponentProps, ElementType } from 'react';
import { forwardRef } from 'react';

import { Component } from '../_LAB/component';
import { getGridClass } from './helpers/grid';
import type { Grid } from './types/grid';

import { join } from 'ameliance-scripts/scripts/join';

export type BlockElement = ComponentProps<ElementType>;

export interface BlockProps extends Omit<ReactHTMLElementAttributes<BlockElement>, 'ref'> {
   component?: ElementType;
   grid?: Grid;
}

export const Block = forwardRef<BlockElement, BlockProps>(
   ({ component = 'div', grid, children, className, ...rest }, ref) => {
      const gridClass = grid && getGridClass(grid);

      const attributes = {
         className: join(className, gridClass),
         ref,
         ...rest,
      };

      return (
         <Component as={component} {...attributes}>
            {children}
         </Component>
      );
   },
);

Block.displayName = 'Block';

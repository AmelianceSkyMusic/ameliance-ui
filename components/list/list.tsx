import { forwardRef } from 'react';

import { ReactChildren } from '../_LAB/react-children';

import c from './list.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type ListElement = HTMLUListElement;

export type ListProps = React.ComponentPropsWithoutRef<'ul'> & {
   type?: 'unordered' | 'custom';
   margin?: number;
};

export const List = forwardRef<ListElement, ListProps>(
   ({ type, margin, children, className, ...rest }, ref) => {
      const componentClass = [type === 'unordered' && c[type], type === 'custom' && c[type]];

      const componentStyle = {
         marginLeft: margin && `${margin}px`,
      };

      return (
         <ul
            className={join(c.root, className, componentClass)}
            ref={ref}
            style={componentStyle}
            {...rest}
         >
            <ReactChildren style={componentStyle}>{children}</ReactChildren>
         </ul>
      );
   },
);

List.displayName = 'List';

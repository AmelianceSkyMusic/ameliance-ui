import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

export type ContainerElement = HTMLDivElement;

export type ContainerProps = React.ComponentPropsWithoutRef<'div'> & {
   gridContainer?: boolean;
};

export const Container = forwardRef<ContainerElement, ContainerProps>(
   ({ gridContainer, children, className, ...rest }, ref) => (
      <div className={join(className, 'container', gridContainer && 'row')} ref={ref} {...rest}>
         {children}
      </div>
   ),
);

Container.displayName = 'Container';

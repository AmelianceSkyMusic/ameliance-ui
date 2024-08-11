import { forwardRef } from 'react';

import c from './loader-bars.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type LoaderBarsElement = HTMLDivElement;

export type LoaderBarsProps = React.ComponentPropsWithoutRef<'div'>;

export const LoaderBars = forwardRef<LoaderBarsElement, LoaderBarsProps>(
   ({ className, ...rest }, ref) => (
      <div className={join(c.root, className)} ref={ref} {...rest}>
         <div />
         <div />
         <div />
      </div>
   ),
);

LoaderBars.displayName = 'LoaderBars';

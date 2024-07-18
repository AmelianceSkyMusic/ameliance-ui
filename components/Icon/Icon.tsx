import { forwardRef } from 'react';

import c from './icon.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type IconElement = HTMLDivElement;

export type IconProps = React.ComponentPropsWithoutRef<'div'> & {
   size?: ComponentSizes;
   height?: string | number;
   width?: string | number;
};

export const Icon = forwardRef<IconElement, IconProps>(
   ({ size = 'default', width, height, onClick, children, className, style, ...rest }, ref) => {
      const componentClass = [onClick && 'clickable', size && c[size]];

      const customSizeStyle = size === 'custom' && width && height ? { width, height } : {};

      return (
         <div
            className={join(c.root, className, componentClass)}
            onClick={onClick}
            ref={ref}
            style={{ ...style, ...customSizeStyle }}
            {...rest}
         >
            {children}
         </div>
      );
   },
);

Icon.displayName = 'Icon';

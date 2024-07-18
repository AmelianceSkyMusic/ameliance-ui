import { forwardRef } from 'react';

import c from './svg-icon.module.scss';

type ComponentElementType = HTMLSpanElement;

interface SvgIcon extends ReactHTMLElementAttributes<ComponentElementType> {
   icon: string;
   size?: ComponentSizes;
   customSize?: number;
   clickable?: boolean;
   disabled?: boolean;
   inverted?: boolean;
   className?: string;
}

export const SvgIcon = forwardRef<HTMLSpanElement, SvgIcon>(
   (
      {
         icon,
         size,
         customSize,
         clickable,
         disabled,
         inverted,
         children,
         className,
         ...rest
      }: SvgIcon,
      ref,
   ) => {
      const componentClass = [
         size && c[size],
         (clickable || rest.onClick) && c.clickable,
         disabled && c.disabled,
         inverted && c.inverted,
      ];

      const sizeStyle =
         size === 'custom'
            ? {
                 width: `${customSize}px`,
                 height: `${customSize}px`,
              }
            : {};

      return (
         <span
            className={asm.join(c.SvgIcon, className, icon, componentClass)}
            style={sizeStyle}
            ref={ref}
            {...rest}
         >
            {children}
         </span>
      );
   },
);

SvgIcon.displayName = 'SvgIcon';

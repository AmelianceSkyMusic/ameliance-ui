import { forwardRef } from 'react';

import typography from '../typography/typography.module.scss';
import c from './button.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type ButtonElement = HTMLButtonElement;

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
   size?: ComponentSizes;
   disabled?: boolean;
   type?: 'primary' | 'secondary' | 'text';
   submit?: boolean;
   form?: string;
};

export const Button = forwardRef<ButtonElement, ButtonProps>(
   ({ size = 'default', type = 'primary', submit, form, children, className, ...rest }, ref) => {
      // *----- check is icon should be button icon  -----
      const hasLabel = Array.isArray(children)
         ? children?.some((child) => typeof child === 'string')
         : typeof children === 'string';

      const sizeClass = size && c[size];

      const componentClass = [type && c[type], !hasLabel && c.icon];

      return (
         <button
            type={submit ? 'submit' : 'button'}
            className={join(c.root, className, sizeClass, componentClass)}
            ref={ref}
            form={form}
            {...rest}
         >
            <span className={join(c.label, typography.button, sizeClass)}>{children}</span>
         </button>
      );
   },
);

Button.displayName = 'Button';

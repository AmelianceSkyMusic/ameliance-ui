import { forwardRef } from 'react';

import typography from '../typography/typography.module.scss';
import c from './button.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type ButtonLinkElement = HTMLAnchorElement;

export type ButtonLinkProps = React.ComponentPropsWithoutRef<'a'> & {
   size?: ComponentSizes;
   disabled?: boolean;
   type?: 'primary' | 'secondary' | 'text';
   blank?: boolean;
};

export const ButtonLink = forwardRef<ButtonLinkElement, ButtonLinkProps>(
   ({ size = 'default', type = 'primary', blank, children, className, ...rest }, ref) => {
      // *----- check is icon should be button icon  -----
      const hasLabel = Array.isArray(children)
         ? children?.some((child) => typeof child === 'string')
         : typeof children === 'string';

      const sizeClass = size && c[size];

      const componentClass = [type && c[type], !hasLabel && c.icon];

      const blankAttributes = blank && {
         target: '_blank',
         rel: 'noreferrer noopener',
      };

      return (
         <a
            className={join(c.Button, className, sizeClass, componentClass)}
            ref={ref}
            {...blankAttributes}
            {...rest}
         >
            <span className={join(c.label, typography.button, sizeClass)}>{children}</span>
         </a>
      );
   },
);

ButtonLink.displayName = 'ButtonLink';

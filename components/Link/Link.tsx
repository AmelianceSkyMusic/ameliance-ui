import { forwardRef } from 'react';

import typography from '../typography/typography.module.scss';
import c from './link.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type LinkElement = HTMLAnchorElement;

export type LinkProps = React.ComponentPropsWithoutRef<'a'> & {
   display?: TypographyVariants;
   underline?: boolean;
   hover?: boolean;
   blank?: boolean;
};

export const Link = forwardRef<LinkElement, LinkProps>(
   ({ display, underline, hover = true, children, blank, className, ...rest }, ref) => {
      // *----- create class from props -----
      const componentClass = [
         display ? typography[display] : typography.link,
         underline === false && c.noUnderline,
         hover && c.hover,
      ];

      const blankAttributes = blank && {
         target: '_blank',
         rel: 'noreferrer noopener',
      };

      return (
         <a
            className={join(c.root, className, componentClass)}
            ref={ref}
            {...blankAttributes}
            {...rest}
         >
            {children}
         </a>
      );
   },
);

Link.displayName = 'Link';

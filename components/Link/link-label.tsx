import { forwardRef } from 'react';

import typography from '../typography/typography.module.scss';
import c from './link.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type LinkLabelElement = HTMLSpanElement;

export type LinkLabelProps = React.ComponentPropsWithoutRef<'span'> & {
   display?: TypographyVariants;
   underline?: boolean;
   blank?: boolean;
};

export const LinkLabel = forwardRef<LinkLabelElement, LinkLabelProps>(
   ({ display, underline, children, blank, className, ...rest }, ref) => {
      // *----- create class from props -----
      const componentClass = [
         display ? typography[display] : typography.link,
         underline === false && c.noUnderline,
      ];

      const blankAttributes = blank && {
         target: '_blank',
         rel: 'noreferrer noopener',
      };

      return (
         <span
            className={join(c.root, className, componentClass)}
            ref={ref}
            {...blankAttributes}
            {...rest}
         >
            {children}
         </span>
      );
   },
);

LinkLabel.displayName = 'LinkLabel';

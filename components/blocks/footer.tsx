import { forwardRef } from 'react';

import { join } from 'ameliance-scripts/scripts/join';

export type FooterElement = HTMLElement;

export type FooterProps = React.ComponentPropsWithoutRef<'footer'>;

export const Footer = forwardRef<FooterElement, FooterProps>(
   ({ children, className, ...rest }, ref) => (
      <footer className={join(className, 'footer')} ref={ref} {...rest}>
         {children}
      </footer>
   ),
);

Footer.displayName = 'Footer';

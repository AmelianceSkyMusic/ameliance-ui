import { forwardRef } from 'react';

import { join } from 'ameliance-scripts/scripts/join';

export type MainElement = HTMLElement;

export type MainProps = React.ComponentPropsWithoutRef<'main'>;

export const Main = forwardRef<MainElement, MainProps>(({ children, className, ...rest }, ref) => (
   <main className={join(className, 'main')} ref={ref} {...rest}>
      {children}
   </main>
));

Main.displayName = 'Main';

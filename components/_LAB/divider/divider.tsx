import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import c from './divider.module.scss';

export type DividerElement = HTMLHRElement;

export type DividerProps = React.ComponentPropsWithoutRef<'hr'>;

export const Divider = forwardRef<DividerElement, DividerProps>(({ className, ...rest }, ref) => (
	<hr className={join(c.root, className)} ref={ref} {...rest} />
));

Divider.displayName = 'Divider';

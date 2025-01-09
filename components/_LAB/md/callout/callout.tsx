import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import c from './callout.module.scss';

export type CalloutElement = HTMLDivElement;

export type CalloutProps = React.ComponentPropsWithoutRef<'div'>;

export const Callout = forwardRef<CalloutElement, CalloutProps>(
	({ children, className, ...rest }, ref) => {
		return (
			<div className={join(c.root, className)} ref={ref} {...rest}>
				<div>Callout Header</div>
				{children}
				<p>Some text...</p>
			</div>
		);
	},
);

Callout.displayName = 'Callout';

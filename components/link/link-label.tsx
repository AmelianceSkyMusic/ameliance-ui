import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { TypographyVariants } from '../typography';

import typography from '../typography/typography.module.scss';
import c from './link.module.scss';

export type LinkLabelElement = HTMLSpanElement;

export type LinkLabelProps = React.ComponentPropsWithoutRef<'span'> & {
	display?: TypographyVariants;
	underline?: boolean;
	blank?: boolean;
	active?: boolean;
	disabled?: boolean;
};

export const LinkLabel = forwardRef<LinkLabelElement, LinkLabelProps>(
	({ display, underline, children, blank, active, disabled, className, ...rest }, ref) => {
		// *----- create class from props -----
		const componentClass = [
			display ? typography[display] : typography.link,
			underline === false && c.noUnderline,
			active && c.active,
			disabled && c.disabled,
		];

		return (
			<span className={join(c.root, className, componentClass)} ref={ref} {...rest}>
				{children}
			</span>
		);
	},
);

LinkLabel.displayName = 'LinkLabel';

import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { ComponentSizesLegacy } from '../types/component-sizes-legacy';

import typography from '../typography/typography.module.scss';
import c from './button.module.scss';

export type ButtonElement = HTMLButtonElement;

export type ButtonProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'type'> & {
	size?: ComponentSizesLegacy;
	disabled?: boolean;
	type?: 'primary' | 'secondary' | 'text';
	form?: string;
	buttonType?: React.ComponentPropsWithoutRef<'button'>['type'];
};

export const Button = forwardRef<ButtonElement, ButtonProps>(
	(
		{
			size = 'default',
			type = 'primary',
			buttonType = 'button',
			form,
			children,
			className,
			...rest
		},
		ref,
	) => {
		// *----- check is icon should be button icon  -----
		const hasLabel = Array.isArray(children)
			? children?.some((child) => typeof child === 'string')
			: typeof children === 'string';

		const sizeClass = size && c[size];

		const componentClass = [type && c[type], !hasLabel && c.icon];

		return (
			<button
				type={buttonType}
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

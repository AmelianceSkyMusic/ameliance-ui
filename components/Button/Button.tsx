import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import typography from '../Typography/Typography.module.scss';
import s from './Button.module.scss';

export type ButtonElement = HTMLButtonElement;
export interface ButtonProps extends ReactHTMLElementAttributes<ButtonElement> {
	size?: ComponentSizes;
	disabled?: boolean;
	type?: 'primary' | 'secondary' | 'text';
	submit?: boolean;
}

export const Button = forwardRef<ButtonElement, ButtonProps>(({
	size = 'default',
	type = 'primary',
	submit,
	children,
	className,
	...rest
}, ref) => {
	// *----- check is icon should be button icon  -----
	const hasLabel = Array.isArray(children)
		? children?.some((child) => typeof child === 'string')
		: typeof children === 'string';

	const sizeClass = size && s[size];

	const componentClass = [
		type && s[type],
		!hasLabel && s.icon,
	];

	return (
		<button
			type={submit ? 'submit' : 'button'}
			className={asm.join(s.Button, className, sizeClass, componentClass)}
			ref={ref}
			{...rest}
		>
			<span className={asm.join(s.label, typography.button, sizeClass)}>
				{children}
			</span>
		</button>
	);
});

Button.displayName = 'Button';

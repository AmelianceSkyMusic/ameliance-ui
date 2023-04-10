import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './SvgIcon.module.scss';

type ComponentElementType = HTMLSpanElement;

interface SvgIcon extends ReactHTMLElementAttributes<ComponentElementType> {
	icon: string;
	size?: ComponentSizes;
	customSize?: number;
	clickable?: boolean;
	disabled?: boolean;
	inverted?: boolean;
	className?: string;
}

export const SvgIcon = forwardRef<HTMLSpanElement, SvgIcon>(({
	icon,
	size,
	customSize,
	clickable,
	disabled,
	inverted,
	children,
	className,
	...rest
}: SvgIcon, ref) => {
	const componentClass = [
		size && s[size],
		(clickable || rest.onClick) && s.clickable,
		disabled && s.disabled,
		inverted && s.inverted,
	];

	const sizeStyle = size === 'custom' ? {
		width: `${customSize}px`,
		height: `${customSize}px`,
	} : {};

	return (
		<span
			className={asm.join(s.SvgIcon, className, icon, componentClass)}
			style={sizeStyle}
			ref={ref}
			{...rest}
		>
			{children}
		</span>
	);
});

SvgIcon.displayName = 'SvgIcon';

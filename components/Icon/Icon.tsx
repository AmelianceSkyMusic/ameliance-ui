import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './Icon.module.scss';

export type IconElement = HTMLDivElement;

export interface IconProps extends ReactHTMLElementAttributes<IconElement> {
	size?: ComponentSizes;
	height?: string | number;
	width?: string | number;
}

export const Icon = forwardRef<IconElement, IconProps>(({
	size = 'default',
	width = 24,
	height = 24,
	onClick,
	children,
	className,
	style,
	...rest
}, ref) => {
	const componentClass = [
		onClick && 'clickable',
		size && s[size],
	];

	const customSizeStyle = size === 'custom' ? { width, height } : {};

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			className={asm.join(s.Icon, className, componentClass)}
			onClick={onClick}
			ref={ref}
			style={{ ...style, ...customSizeStyle }}
			{...rest}
		>
			{children}
		</div>
	);
});

Icon.displayName = 'Icon';

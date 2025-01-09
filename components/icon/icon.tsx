import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { ComponentSizes } from '../types/component-sizes';

import c from './icon.module.scss';

export type IconElement = HTMLSpanElement;

export type IconProps = React.ComponentPropsWithoutRef<'span'> & {
	size?: ComponentSizes;
	width?: string | number;
	height?: string | number;
	clickable?: boolean;
};

export const Icon = forwardRef<IconElement, IconProps>(
	({ size = 'md', width, height, onClick, children, className, style, ...rest }, ref) => {
		// const componentClass = [onClick && 'clickable', size && c[size]];
		const componentClass = [onClick && c.clickable, size && c[size]];

		const customSizeStyle = size === 'custom' && width && height ? { width, height } : {};

		return (
			<span
				className={join(c.size, className, componentClass)}
				onClick={onClick}
				ref={ref}
				style={{ ...style, ...customSizeStyle }}
				{...rest}
			>
				{children}
			</span>
		);
	},
);

Icon.displayName = 'Icon';

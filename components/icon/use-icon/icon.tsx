import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { ComponentSizes } from '../../types/component-sizes';

import c from '../common.module.scss';

export type IconElement = HTMLDivElement;

export type IconProps = React.ComponentPropsWithoutRef<'div'> & {
	variant: string;
	size?: ComponentSizes;
	prefix?: string;
};

export const Icon = forwardRef<IconElement, IconProps>(
	({ variant, size = 'md', prefix = 'icon', onClick, children, className, ...rest }, ref) => {
		const componentClass = [onClick && 'clickable'];
		const icon = `${prefix}-${size}--${variant}`;

		return (
			<div
				className={join(c.root, icon, className, componentClass)}
				onClick={onClick}
				ref={ref}
				{...rest}
			>
				{children}
			</div>
		);
	},
);

Icon.displayName = 'Icon';

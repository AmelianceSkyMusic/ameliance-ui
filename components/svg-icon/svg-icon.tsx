import { forwardRef } from 'react';

import type { ComponentSizesLegacy } from '../types/component-sizes-legacy';

export type SvgIconElement = SVGSVGElement;

export type SvgIconProps = React.ComponentPropsWithoutRef<'svg'> & {
	size?: ComponentSizesLegacy;
	height?: string;
	width?: string;
	strokeWidth?: number;
};

export const SvgIcon = forwardRef<SvgIconElement, SvgIconProps>(
	({ size = 'default', strokeWidth = 2, height, width, children, className, ...rest }, ref) => {
		const sizes: Partial<Record<ComponentSizesLegacy, string>> = {
			tiny: '12px',
			small: '16px',
			default: '24px',
			medium: '32px',
			large: '36px',
			extra: '48px',
		};
		sizes.custom = sizes.default;

		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width={width || sizes[size]}
				height={height || sizes[size]}
				className={className}
				fill="currentColor"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				ref={ref}
				{...rest}
			>
				{children}
			</svg>
		);
	},
);

SvgIcon.displayName = 'SvgIcon';

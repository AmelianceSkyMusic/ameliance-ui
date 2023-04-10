import type { SVGProps } from 'react';

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
	size?: ComponentSizes;
	height?: string;
	width?: string;
	strokeWidth?: number;
}

export function SvgIcon({
	size = 'default',
	strokeWidth = 2,
	height,
	width,
	children,
	className,
	...rest
}: SvgIconProps) {
	const sizes = {
		tiny: '12px',
		small: '16px',
		default: '24px',
		medium: '32px',
		large: '36px',
		extra: '48px',
		custom: '24px',
	};

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
			{...rest}
		>
			{children}
		</svg>
	);
}

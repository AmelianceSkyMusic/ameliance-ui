import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import { Typography } from '../Typography';

import s from './Chip.module.scss';

export type ChipElement = HTMLDivElement;

export interface ChipProps extends ReactHTMLElementAttributes<ChipElement> {
	label: string;
	onChange: () => void;
	size?: ComponentSizes;
	selected?: boolean;
	disabled?: boolean;
}

export const Chip = forwardRef<ChipElement, ChipProps>(({
	onChange,
	className,
	label,
	size = 'default',
	selected,
	disabled,
	...rest
}, ref) => {
	const handleOnClick = () => {
		if (onChange) onChange();
	};

	const chipClass = [
		selected && s.selected,
		disabled && s.disabled,
	];

	const sizeClass = size && s[size];

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			className={asm.join(s.Chip, className, sizeClass, chipClass)}
			onClick={handleOnClick}
			ref={ref}
			{...rest}
		>
			<Typography component="p1" className={asm.join(s.label, sizeClass)}>{label}</Typography>
		</div>
	);
});

Chip.displayName = 'Chip';

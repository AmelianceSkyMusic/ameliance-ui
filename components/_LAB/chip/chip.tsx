import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { ComponentSizesLegacy } from '../../types/component-sizes-legacy';
import { Typography } from '../../typography';

import c from './chip.module.scss';

export type ChipElement = HTMLDivElement;

export type ChipProps = React.ComponentPropsWithoutRef<'div'> & {
	label: string;
	onChange: () => void;
	size?: ComponentSizesLegacy;
	selected?: boolean;
	disabled?: boolean;
};

export const Chip = forwardRef<ChipElement, ChipProps>(
	({ onChange, className, label, size = 'default', selected, disabled, ...rest }, ref) => {
		const handleOnClick = () => {
			if (onChange) onChange();
		};

		const chipClass = [selected && c.selected, disabled && c.disabled];

		const sizeClass = size && c[size];

		return (
			<div
				className={join(c.root, className, sizeClass, chipClass)}
				onClick={handleOnClick}
				ref={ref}
				{...rest}
			>
				<Typography component="p1" className={join(c.label, sizeClass)}>
					{label}
				</Typography>
			</div>
		);
	},
);

Chip.displayName = 'Chip';

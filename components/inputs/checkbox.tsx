import { forwardRef } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import { join } from 'ameliance-scripts';

import { Typography } from '../typography';

import c from './checkbox.module.scss';
import cs from './common-style.module.scss';

export type CheckboxElement = HTMLInputElement;

export type CheckboxProps = React.ComponentPropsWithoutRef<'input'> & {
	register?: FieldValues;
	errors?: FieldErrors<FieldValues>;
	onLabelClick?: (event: React.MouseEvent<HTMLParagraphElement>) => void;
	label: string;
};

export const Checkbox = forwardRef<CheckboxElement, CheckboxProps>(
	({ register = null, errors, onLabelClick, label, children, className, ...rest }, ref) => {
		const handleLabelOnClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
			if (onLabelClick) onLabelClick(event);
		};

		const errorMessage = errors ? errors[register?.name]?.message : '';

		return (
			<div className={cs.container}>
				{children && <Typography component="h3">{children}</Typography>}
				<div className={cs.inputBlockContainer}>
					<label className={c.inputContainer}>
						<input
							type="checkbox"
							className={join(c.input, className, 'input-checkbox')}
							onClick={handleLabelOnClick}
							{...register}
							{...rest}
							ref={ref}
						/>
						<Typography component="p1">{label}</Typography>
					</label>
					{register && (
						<Typography component="p2" className={cs.error}>
							{typeof errorMessage === 'string' && errorMessage}
						</Typography>
					)}
				</div>
			</div>
		);
	},
);

Checkbox.displayName = 'Checkbox';

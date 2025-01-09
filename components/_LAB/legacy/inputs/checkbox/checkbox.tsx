import { forwardRef } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import { join } from 'ameliance-scripts';

import { Typography } from '../../../../typography';
import type { InputWrapperCommonProps } from '../input-wrapper/input-wrapper';
import { InputWrapper } from '../input-wrapper/input-wrapper';

import cs from '../common-style.module.scss';
import c from './checkbox.module.scss';

export type CheckboxElement = HTMLInputElement;

export type CheckboxProps = React.ComponentPropsWithoutRef<'input'> &
	InputWrapperCommonProps & {
		text: string;
		register?: FieldValues;
		errors?: FieldErrors<FieldValues>;
	};

export const Checkbox = forwardRef<CheckboxElement, CheckboxProps>(
	({ label, text, required, disabled, register, errors, className, ...rest }, ref) => {
		const error = errors ? errors[register?.name]?.message?.toString() : '';
		const componentClass = [error && cs.error, disabled && cs.disabled, className];

		return (
			<InputWrapper
				label={label}
				error={error}
				required={required}
				disabled={disabled}
				className={join(componentClass)}
				showError={!!errors}
			>
				<div className={c.elementsContainer}>
					<label className={c.element}>
						<input
							type="checkbox"
							value={text}
							className={c.input}
							ref={ref}
							{...register}
							{...rest}
						/>
						<Typography component="p1" className={c.label}>
							{text}
						</Typography>
					</label>
				</div>
			</InputWrapper>
		);
	},
);

Checkbox.displayName = 'Checkbox';

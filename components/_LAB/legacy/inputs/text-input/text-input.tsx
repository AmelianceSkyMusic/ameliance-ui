import { forwardRef } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import { join } from 'ameliance-scripts';

import { InputWrapper } from '../input-wrapper/input-wrapper';

import cs from '../common-style.module.scss';

export type TextInputElement = HTMLInputElement;

export type TextInputProps = React.ComponentPropsWithoutRef<'input'> & {
	label?: string;
	register?: FieldValues;
	errors?: FieldErrors<FieldValues>;
	required?: boolean;
	disabled?: boolean;
};

export const TextInput = forwardRef<TextInputElement, TextInputProps>(
	({ label, required, disabled, register, errors, placeholder, className, ...rest }, ref) => {
		const error = errors ? errors[register?.name]?.message?.toString() : '';
		const componentClass = [error && cs.error, disabled && cs.disabled];

		return (
			<label className={className}>
				<InputWrapper
					label={label}
					error={error}
					required={required}
					disabled={disabled}
					className={join(componentClass)}
					showError={!!errors}
				>
					<input
						type="text"
						className={cs.input}
						placeholder={placeholder}
						ref={ref}
						{...register}
						{...rest}
					/>
				</InputWrapper>
			</label>
		);
	},
);

TextInput.displayName = 'TextInput';

import { forwardRef } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import { join } from 'ameliance-scripts';

import { ChevronDownIcon } from '../../../../icons/react/chevron-down-icon';
import type { InputWrapperCommonProps } from '../input-wrapper/input-wrapper';
import { InputWrapper } from '../input-wrapper/input-wrapper';

import cs from '../common-style.module.scss';
import c from './dropdown.module.scss';

export type DropdownElement = HTMLSelectElement;

export type DropdownProps = React.ComponentPropsWithoutRef<'select'> &
	InputWrapperCommonProps & {
		label?: string;
		options: string[];
		register?: FieldValues;
		errors?: FieldErrors<FieldValues>;
		required?: boolean;
		disabled?: boolean;
		defaultValue?: string;
		placeholder?: string;
	};

export const Dropdown = forwardRef<DropdownElement, DropdownProps>(
	(
		{
			label,
			placeholder,
			required,
			disabled,
			options,
			register,
			errors,
			defaultValue,
			className,
			...rest
		},
		ref,
	) => {
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
					<div className={c.inputContainer}>
						<select
							className={join(c.input, cs.input)}
							defaultValue={defaultValue || ''}
							ref={ref}
							{...register}
							{...rest}
						>
							{placeholder && (
								<option value="" disabled>
									{placeholder}
								</option>
							)}
							{options.map((optionValue) => (
								<option key={optionValue} value={optionValue}>
									{optionValue}
								</option>
							))}
						</select>
						<ChevronDownIcon className={c.icon} />
					</div>
				</InputWrapper>
			</label>
		);
	},
);

Dropdown.displayName = 'Dropdown';

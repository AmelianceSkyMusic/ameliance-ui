import { forwardRef } from 'react';
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import s from './Dropdown.module.scss';

type ComponentElementType = HTMLSelectElement;

export interface DropdownProps extends ReactHTMLElementAttributes<ComponentElementType> {
	options: string[];
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
}

export const Dropdown = forwardRef<ComponentElementType, DropdownProps>(({
	options,
	register,
	errors,
	children,
	className,
	...rest
}, ref) => (
	<div
		className={s.Dropdown}
	>
		<span className="h3">{children}</span>
		<label>
			<select
				className={asm.join(s.input, className, 'input dropdown')}
				{...register}
				ref={ref}
				{...rest}
			>
				<option> </option>
				{options.map((optionValue) => (
					<option key={optionValue} value={optionValue}>
						{optionValue}
					</option>
				))}
			</select>
		</label>
		<p className={asm.join(s.input, 'p2 input-error')}>
			{(errors && errors[register.name] && errors[register.name].message) || ''}
		</p>
	</div>
));

Dropdown.displayName = 'Dropdown';

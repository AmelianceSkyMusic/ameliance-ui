import React from 'react';
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import s from './Checkbox.module.scss';

interface IProps {
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
	label: string;
	placeholder?: string;
	children?: React.ReactNode;
	testId?: string;
}

export function Checkbox({
	register, errors, label, children, testId,
}: IProps) {
	return (
		<div className={s.Checkbox}>
			<span className="h3">{children}</span>
			<label className={s.container}>
				<input
					type="checkbox"
					className="checkbox__input"
					{...register}
					data-testid={testId}
				/>
				<span className="p1 checkbox__label">{label}</span>
			</label>
			<p className={asm.join(s.error, 'p2 input-error')}>
				{(errors && errors[register.name] && errors[register.name].message) || ''}
			</p>
		</div>
	);
}

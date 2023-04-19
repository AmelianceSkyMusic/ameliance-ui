import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import s from './DateInput.module.scss';

interface IProps {
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
	children?: React.ReactNode;
	testId?: string;
}

export function DateInput({
	register, errors, children, testId,
}: IProps) {
	return (
		<div className={s.DateInput}>
			<span className="h3">{children}</span>
			<label>
				<input
					type="date"
					className={asm.join(s.input, 'input date')}
					{...register}
					data-testid={testId}
				/>
			</label>
			<p className={asm.join(s.error, 'p2 input-error')}>
				{(errors && errors[register.name] && errors[register.name].message) || ''}
			</p>
		</div>
	);
}

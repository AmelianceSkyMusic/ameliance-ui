import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import s from './RadioButtons.module.scss';

interface IProps {
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
	labels: (string | number)[];
	placeholder?: string;
	children?: React.ReactNode;
	testId?: string;
}

export function RadioButtons({
	register, errors, labels, children, testId,
}: IProps) {
	return (
		<div className={s.RadioButtons}>
			<span className="h3">{children}</span>
			<div className={s.radioButtonContainer}>
				{labels.map((value) => (
					<div key={`${value}`} className="radio-button">
						<label className={s.container}>
							<input
								type="radio"
								// className="radio-button__input" // TODO: check is need
								{...register}
								value={value.toString()}
								data-testid={testId}
							/>
							<span className="p1">{value}</span>
						</label>
					</div>
				))}
			</div>
			<p className={asm.join(s.error, 'p2 input-error')}>
				{(errors && errors[register.name] && errors[register.name].message) || ''}
			</p>
		</div>
	);
}

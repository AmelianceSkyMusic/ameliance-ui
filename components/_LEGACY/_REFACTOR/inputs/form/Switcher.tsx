import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import s from './Switcher.module.scss';

interface IProps {
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
	label: string;
	placeholder?: string;
	children?: React.ReactNode;
	testId?: string;
}

export function Switcher({
	register, errors, label, children, testId,
}: IProps) {
	return (
		<div className={s.Switcher}>
			<span className="h3">{children}</span>
			<label className={s.container}>
				<input type="checkbox" className={s.switcherCheckbox} {...register} data-testid={testId} />
				<div className={s.element} />
				<span className="p1">{label}</span>
			</label>
			<p className={asm.join(s.error, 'p2 input-error')}>
				{(errors && errors[register.name] && errors[register.name].message) || ''}
			</p>
		</div>
	);
}

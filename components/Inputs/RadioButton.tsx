import React, { forwardRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Typography } from '../Typography';

import typography from '../Typography/Typography.module.scss';
import cs from './commonStyle.module.scss';
import s from './RadioButton.module.scss';

export type RadioButtonElement = HTMLInputElement;

export interface RadioButtonProps extends ReactHTMLElementAttributes<RadioButtonElement> {
	register?: FieldValues;
	errors?: FieldErrors<TFieldValues>;
	labels: (string | number)[];
}

export const RadioButton = forwardRef<RadioButtonElement, RadioButtonProps>(({
	register,
	errors,
	labels,
	children,
	...rest
}, ref) => {
	const errorMessage = errors ? errors[register?.name]?.message : '';

	return (
		<div className={cs.container}>
			<Typography component="h5">{children}</Typography>
			<div className={cs.inputBlockContainer}>
				<div className={s.elementsContainer}>
					{labels.map((value) => (
						<label key={value} className={s.element}>
							<input
								type="radio"
								className={asm.join(s.input, typography.input)}
								value={value.toString()}
								ref={ref}
								{...register}
								{...rest}
							/>
							<Typography component="p1">{value}</Typography>
						</label>
					))}
				</div>
				{register && (
					<Typography component="p2" className={asm.join(cs.error)}>
						{typeof errorMessage === 'string' && errorMessage}
					</Typography>
				)}
			</div>
		</div>
	);
});

RadioButton.displayName = 'RadioButton';

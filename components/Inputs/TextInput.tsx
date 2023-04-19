import { forwardRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Typography } from '../Typography';

import typography from '../Typography/Typography.module.scss';
import cs from './commonStyle.module.scss';

export type TextInputElement = HTMLInputElement;

export interface TextInputProps extends ReactHTMLElementAttributes<TextInputElement> {
	register?: FieldValues;
	errors?: FieldErrors<TFieldValues>;
}

export const TextInput = forwardRef<TextInputElement, TextInputProps>(({
	register,
	errors,
	placeholder,
	children,
	...rest
}, ref) => {
	const errorMessage = errors ? errors[register?.name]?.message : '';

	return (
		<div className={cs.container}>
			<Typography component="h5">{children}</Typography>
			<div className={cs.inputBlockContainer}>
				<label>
					<input
						type="text"
						className={asm.join(cs.input, typography.input)}
						placeholder={placeholder}
						ref={ref}
						{...register}
						{...rest}
					/>
				</label>
				{register && register?.name && (
					<Typography component="p2" className={asm.join(cs.error)}>
						{typeof errorMessage === 'string' && errorMessage}
					</Typography>
				)}
			</div>
		</div>
	);
});

TextInput.displayName = 'TextInput';

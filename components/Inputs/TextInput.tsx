import { forwardRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Typography } from '../Typography';

import typography from '../Typography/Typography.module.scss';
import cs from './commonStyle.module.scss';

export type TextInputElement = HTMLInputElement;

export interface TextInputProps extends ReactHTMLElementAttributes<TextInputElement> {
	register?: FieldValues;
	errors?: Record<string, FieldError> | undefined;
}

export const TextInput = forwardRef<TextInputElement, TextInputProps>(({
	register,
	errors,
	placeholder,
	children,
	...rest
}, ref) => (
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
			{register && (
				<Typography component="p2" className={asm.join(cs.error)}>
					{(errors && errors[register?.name] && errors[register?.name].message) || ''}
				</Typography>
			)}
		</div>
	</div>
));

TextInput.displayName = 'TextInput';

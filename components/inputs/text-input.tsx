import { forwardRef } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import { join } from 'ameliance-scripts';

import { Typography } from '../typography';

import typography from '../typography/typography.module.scss';
import cs from './common-style.module.scss';

export type TextInputElement = HTMLInputElement;

export type TextInputProps = React.ComponentPropsWithoutRef<'input'> & {
	register?: FieldValues;
	errors?: FieldErrors<FieldValues>;
};

export const TextInput = forwardRef<TextInputElement, TextInputProps>(
	({ register, errors, placeholder, className, children, ...rest }, ref) => {
		const errorMessage = errors ? errors[register?.name]?.message : '';

		return (
			<div className={cs.container}>
				<Typography component="h5">{children}</Typography>
				<div className={cs.inputBlockContainer}>
					<label>
						<input
							type="text"
							className={join(cs.input, typography.input, className)}
							placeholder={placeholder}
							ref={ref}
							{...register}
							{...rest}
						/>
					</label>
					{errors && (
						<Typography component="p2" className={cs.error}>
							{typeof errorMessage === 'string' && errorMessage}
						</Typography>
					)}
				</div>
			</div>
		);
	},
);

TextInput.displayName = 'TextInput';

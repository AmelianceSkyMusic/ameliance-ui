import { forwardRef, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Icon } from '../Icon';
import { EyeIcon } from '../icons/EyeIcon';
import { EyeOffIcon } from '../icons/EyeOffIcon';
import { Typography } from '../Typography';

import typography from '../Typography/Typography.module.scss';
import cs from './commonStyle.module.scss';
import ics from './iconCommonStyle.module.scss';

export type PasswordInputElement = HTMLInputElement;

export interface PasswordInputProps extends ReactHTMLElementAttributes<PasswordInputElement> {
	register?: FieldValues;
	errors?: FieldErrors<TFieldValues>;
}

export const PasswordInput = forwardRef<PasswordInputElement, PasswordInputProps>(({
	register,
	errors,
	placeholder,
	children,
	...rest
}, ref) => {
	const [isShowPassword, setIsShowPassword] = useState(false);

	const handlerIconClick = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setIsShowPassword((prev) => !prev);
	};

	const inputType = isShowPassword ? 'text' : 'password';

	const errorMessage = errors ? errors[register?.name]?.message : '';

	return (
		<div className={cs.container}>
			<Typography component="h5">{children}</Typography>
			<div className={cs.inputBlockContainer}>
				<label className={ics.inputContainer}>
					<input
						type={inputType}
						className={asm.join(cs.input, ics.input, typography.input)}
						placeholder={placeholder}
						ref={ref}
						{...register}
						{...rest}
					/>
					<Icon size="custom" style={{ width: 20, height: 20 }} className={ics.icon} onClick={handlerIconClick}>
						{isShowPassword
							? <EyeIcon size="custom" style={{ width: 20, height: 20 }} />
							: <EyeOffIcon size="custom" style={{ width: 20, height: 20 }} />}
					</Icon>
				</label>
				{register && (
					<Typography component="p2" className={asm.join(cs.error)}>
						{typeof errorMessage === 'string' && errorMessage}
					</Typography>
				)}
			</div>
		</div>
	);
});

PasswordInput.displayName = 'PasswordInput';

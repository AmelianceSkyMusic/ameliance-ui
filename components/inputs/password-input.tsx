import { forwardRef, useState } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import { join } from 'ameliance-scripts';

import { Icon } from '../icon';
import { EyeIcon } from '../icons/react/eye-icon';
import { EyeOffIcon } from '../icons/react/eye-off-icon';
import { Typography } from '../typography';

import typography from '../typography/typography.module.scss';
import cs from './common-style.module.scss';
import ics from './icon-common-style.module.scss';

export type PasswordInputElement = HTMLInputElement;

export type PasswordInputProps = React.ComponentPropsWithoutRef<'input'> & {
	register?: FieldValues;
	errors?: FieldErrors<FieldValues>;
};

export const PasswordInput = forwardRef<PasswordInputElement, PasswordInputProps>(
	({ register, errors, placeholder, children, ...rest }, ref) => {
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
							className={join(cs.input, ics.input, typography.input)}
							placeholder={placeholder}
							ref={ref}
							{...register}
							{...rest}
						/>
						<Icon
							size="custom"
							style={{ width: 20, height: 20 }}
							className={ics.icon}
							onClick={handlerIconClick}
						>
							{isShowPassword ? (
								<EyeIcon size="custom" style={{ width: 20, height: 20 }} />
							) : (
								<EyeOffIcon size="custom" style={{ width: 20, height: 20 }} />
							)}
						</Icon>
					</label>
					{register && (
						<Typography component="p2" className={join(cs.error)}>
							{typeof errorMessage === 'string' && errorMessage}
						</Typography>
					)}
				</div>
			</div>
		);
	},
);

PasswordInput.displayName = 'PasswordInput';

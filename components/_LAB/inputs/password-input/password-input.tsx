import { forwardRef, useState } from 'react';

import { EyeIcon } from '../../../icons/svg/eye';
import { EyeOffIcon } from '../../../icons/svg/eye-off';
import type { TextInputProps } from '../text-input';
import { TextInput } from '../text-input';

import cs from '../common-style.module.scss';

export type TextInputElement = HTMLInputElement;

export type PasswordInputProps = Omit<TextInputProps, 'type'>;

export const PasswordInput = forwardRef<TextInputElement, PasswordInputProps>(
	({ className, ...rest }, ref) => {
		const [isShowPassword, setIsShowPassword] = useState(false);

		const handlerIconClick = (event: React.MouseEvent<HTMLElement>) => {
			event.stopPropagation();
			setIsShowPassword((prev) => !prev);
		};

		const inputType = isShowPassword ? 'text' : 'password';

		return (
			<TextInput type={inputType} className={className} {...rest} ref={ref}>
				{isShowPassword ? (
					<EyeOffIcon className={cs.icon} size="sm" onClick={handlerIconClick} />
				) : (
					<EyeIcon className={cs.icon} size="sm" onClick={handlerIconClick} />
				)}
			</TextInput>
		);
	},
);

PasswordInput.displayName = 'PasswordInput';

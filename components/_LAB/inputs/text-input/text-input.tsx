import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import { Block } from '../../../blocks/block';
import { Wrapper } from '../wrapper/wrapper';

import typography from '../../../typography/typography.module.scss';
import cs from '../common-style.module.scss';

export type TextInputElement = HTMLInputElement;

export type TextInputProps = React.ComponentPropsWithoutRef<'input'> & {
	label?: string;
	error?: string;
	hideError?: boolean;
	required?: boolean;
	disabled?: boolean;
};

export const TextInput = forwardRef<TextInputElement, TextInputProps>(
	(
		{
			label,
			required,
			disabled,
			error,
			hideError = false,
			placeholder,
			className,
			children,
			...rest
		},
		ref,
	) => {
		const componentClass = error && cs.error;
		const disabledClass = disabled && cs.disabled;

		return (
			<label className={join(disabledClass, className)}>
				<Wrapper
					label={label}
					error={error}
					required={required}
					className={join(componentClass)}
					showError={!hideError}
				>
					{children ? (
						<Block className={cs.inputContainer}>
							<input
								type="text"
								className={join(cs.input, typography.input)}
								placeholder={placeholder}
								ref={ref}
								{...rest}
							/>
							{children}
						</Block>
					) : (
						<input
							type="text"
							className={join(cs.input, typography.input)}
							placeholder={placeholder}
							ref={ref}
							{...rest}
						/>
					)}
				</Wrapper>
			</label>
		);
	},
);

TextInput.displayName = 'TextInput';

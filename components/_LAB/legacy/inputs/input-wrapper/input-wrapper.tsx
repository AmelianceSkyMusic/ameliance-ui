import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import c from './input-wrapper.module.scss';

export type InputWrapperElement = HTMLDivElement;

export type InputWrapperCommonProps = {
	label?: string;
	required?: boolean;
	disabled?: boolean;
	showError?: boolean;
};

export type InputWrapperProps = React.ComponentPropsWithoutRef<'div'> &
	InputWrapperCommonProps & {
		error?: string;
	};

const NON_BREAKING_SPACE = '\xA0';

export const InputWrapper = forwardRef<InputWrapperElement, InputWrapperProps>(
	({ label, required, disabled, error, className, showError, children, ...rest }, ref) => {
		const containerClass = [error && c.error, disabled && c.disabled];

		const labelString = label && label?.trim().length > 0 ? label : NON_BREAKING_SPACE;

		return (
			<div className={join(c.root, containerClass, className)} ref={ref} {...rest}>
				{label && (
					<div className={c.label}>
						<p className={c.labelText}>
							{labelString}
							{required && label.trim().length > 0 && (
								<span className={c.labelRequired}>*</span>
							)}
						</p>
					</div>
				)}
				<div className={c.inputBlockContainer}>
					{children}
					{showError && <p className={c.errorText}>{error}</p>}
				</div>
			</div>
		);
	},
);

InputWrapper.displayName = 'InputWrapper';

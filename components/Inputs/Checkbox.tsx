import { forwardRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Typography } from '../Typography';

import s from './Checkbox.module.scss';
import cs from './commonStyle.module.scss';

export type CheckboxElement = HTMLInputElement;

export interface CheckboxProps extends ReactHTMLElementAttributes<CheckboxElement> {
	register?: FieldValues;
	errors?: Record<string, FieldError> | undefined;
	onLabelClick?: (event: React.MouseEvent<HTMLParagraphElement>) => void;
	label: string;
}

export const Checkbox = forwardRef<CheckboxElement, CheckboxProps>(({
	register = null,
	errors,
	onLabelClick,
	label,
	children,
	className,
	...rest
}, ref) => {
	const handleLabelOnClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
		if (onLabelClick) onLabelClick(event);
	};

	return (

		<div className={cs.container}>
			{children && <Typography component="h3">{children}</Typography>}
			<div className={cs.inputBlockContainer}>
				{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
				<label className={s.inputContainer}>
					<input
						type="checkbox"
						className={asm.join(s.input, className)}
						ref={ref}
						{...register}
						{...rest}
					/>
					<Typography component="p1" onClick={handleLabelOnClick}>{label}</Typography>
				</label>
				{register && (
					<Typography component="p2" className={asm.join(cs.error)}>
						{(errors && errors[register.name] && errors[register.name].message) || ''}
					</Typography>
				)}
			</div>
		</div>
	);
});

Checkbox.displayName = 'Checkbox';

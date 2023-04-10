import { forwardRef, useState } from 'react';
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Icon } from '../Icon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { Typography } from '../Typography';

import typography from '../Typography/Typography.module.scss';
import cs from './commonStyle.module.scss';
import s from './Dropdown.module.scss';

export type DropdownElement = HTMLSelectElement;

export interface DropdownProps extends ReactHTMLElementAttributes<DropdownElement> {
	options: string[];
	register?: FieldValues;
	errors?: Record<string, FieldError> | undefined;
	selected?: string;
	blank?: boolean;
	onDropdownChange?: (key: string) => void;
}

export const Dropdown = forwardRef<DropdownElement, DropdownProps>(({
	options,
	register,
	errors,
	selected,
	blank,
	onDropdownChange,
	children,
	className,
	...rest
}, ref) => {
	const [selectedValue, setSelectedValue] = useState(selected);
	const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedValue(event.target.value);
		if (onDropdownChange) {
			onDropdownChange(event.target.value);
		}
	};

	return (
		<div className={cs.container}>
			<Typography component="h5">{children}</Typography>
			<div className={cs.inputBlockContainer}>
				<label className={s.inputContainer}>
					<select
						className={asm.join(s.input, cs.input, typography.input, className)}
						value={selectedValue}
						onChange={handleOnChange}
						ref={ref}
						{...register}
						{...rest}
					>
						{blank && <option> </option>}
						{options.map((optionValue) => (
							<option key={optionValue} value={optionValue}>
								{optionValue}
							</option>
						))}
					</select>
					<Icon size="custom" style={{ width: 20, height: 20 }} className={s.icon} onClick={() => null}>
						<ChevronDownIcon size="custom" style={{ width: 20, height: 20 }} />
					</Icon>
				</label>
				{register && (
					<Typography component="p2" className={asm.join(cs.error)}>
						{(errors && errors[register?.name] && errors[register?.name].message) || ''}
					</Typography>
				)}
			</div>
		</div>
	);
});

Dropdown.displayName = 'Dropdown';

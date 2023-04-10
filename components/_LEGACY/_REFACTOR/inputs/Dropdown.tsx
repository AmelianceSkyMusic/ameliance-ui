import { forwardRef, useState } from 'react';

import asm from 'asm-ts-scripts';

import s from './Dropdown.module.scss';

type ComponentElementType = HTMLSelectElement;

interface Dropdown extends ReactHTMLElementAttributes<ComponentElementType> {
	options: string[];
	selected?: string;
	onDropdownChange?: (key: string) => void;
}

export const Dropdown = forwardRef<ComponentElementType, Dropdown>(({
	options,
	selected,
	onDropdownChange,
	children,
	className,
	...rest
}: Dropdown, ref) => {
	const [selectedValue, setSelectedValue] = useState(selected);
	const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedValue(event.target.value);
		if (onDropdownChange) {
			onDropdownChange(event.target.value);
		}
	};

	return (
		<div className={s.Dropdown}>
			<span className="h3">{children}</span>
			<label>
				<select
					className={asm.join(s.input, 'input input dropdown', className)}
					value={selectedValue}
					onChange={handleOnChange}
					ref={ref}
					{...rest}
				>
					{options.map((optionValue) => (
						<option key={optionValue} value={optionValue}>
							{optionValue}
						</option>
					))}
				</select>
			</label>
		</div>
	);
});

Dropdown.displayName = 'Dropdown';

// import React, { useState } from 'react';

// import asm from 'asm-ts-scripts';

// import s from './Dropdown.module.scss';

// interface IProps {
// 	options: string[];
// 	selected?: string;
// 	children?: React.ReactNode;
// 	testId?: string;
// 	disabled?: boolean;
// 	onChange?: (key: string) => void;
// }

// export function Dropdown({
// 	options, children, testId, selected, disabled, onChange,
// }: IProps) {
// 	const [selectedValue, setSelectedValue] = useState(selected);
// 	const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
// 		setSelectedValue(event.target.value);
// 		if (onChange) {
// 			onChange(event.target.value);
// 		}
// 	};

// 	return (
// 		<div className={s.Dropdown}>
// 			<span className="h3">{children}</span>
// 			<label>
// 				<select
// 					className={asm.join(s.input, 'input input dropdown')}
// 					value={selectedValue}
// 					onChange={handleOnChange}
// 					disabled={disabled}
// 					data-testid={testId}
// 				>
// 					{options.map((optionValue) => (
// 						<option key={optionValue} value={optionValue}>
// 							{optionValue}
// 						</option>
// 					))}
// 				</select>
// 			</label>
// 		</div>
// 	);
// }

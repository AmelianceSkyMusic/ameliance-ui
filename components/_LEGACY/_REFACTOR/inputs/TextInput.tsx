import React from 'react';

import asm from 'asm-ts-scripts';

import s from './TextInput.module.scss';

interface IProps {
	value?: string;
	placeholder?: string;
	children?: React.ReactNode;
	testId?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function TextInput({
	value, children, placeholder, testId, onChange, onKeyDown,
}: IProps) {
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) onChange(event);
	};

	return (
		<div className={s.TextInput}>
			<span className="h3">{children}</span>
			<label>
				<input
					type="input"
					value={value}
					onKeyDown={onKeyDown}
					onChange={handleSearchChange}
					className={asm.join(s.input, 'input text')}
					placeholder={placeholder}
					data-testid={testId}
				/>
			</label>
		</div>
	);
}

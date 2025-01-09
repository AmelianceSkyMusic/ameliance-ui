import { forwardRef, useState } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import { join } from 'ameliance-scripts';

import { Icon } from '../icon';
import { SearchIcon } from '../icons/react/search-icon';
import { XIcon } from '../icons/react/x-icon';
import { Typography } from '../typography';

import typography from '../typography/typography.module.scss';
import cs from './common-style.module.scss';
import ics from './icon-common-style.module.scss';

export type SearchInputElement = HTMLInputElement;

export type SearchInputProps = React.ComponentPropsWithoutRef<'input'> & {
	register?: FieldValues;
	errors?: FieldErrors<FieldValues>;
	onApply?: (value: string) => void;
	onChangeValue?: (value: string) => void;
	autoClear?: boolean;
};

export const SearchInput = forwardRef<SearchInputElement, SearchInputProps>(
	(
		{
			register,
			errors,
			onApply,
			placeholder,
			onChangeValue,
			autoClear = false,
			onKeyDown,
			children,
			...rest
		},
		ref,
	) => {
		const [value, setValue] = useState('');

		const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			if (onChangeValue) onChangeValue(event.target.value);
			setValue(event.target.value);
		};

		const handlerSearchIconOnClick = () => {
			if (onApply) onApply(value);
			if (autoClear) setValue('');
		};

		const handlerClearIconOnClick = () => {
			if (onChangeValue) onChangeValue('');
			setValue('');
		};

		const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (onKeyDown) onKeyDown(event);
			if (event.key === 'Enter') {
				if (onApply) onApply(value);
				if (autoClear) setValue('');
			}
		};

		const errorMessage = errors ? errors[register?.name]?.message : '';

		return (
			<div className={cs.container}>
				<Typography component="h5">{children}</Typography>
				<div className={cs.inputBlockContainer}>
					<label className={ics.inputContainer}>
						<input
							type="text"
							className={join(cs.input, ics.input, typography.input)}
							placeholder={placeholder}
							ref={ref}
							onChange={handleOnChange}
							onKeyDown={handleOnKeyDown}
							value={value}
							{...register}
							{...rest}
						/>
						{!onApply && value.length > 0 && (
							<Icon
								size="custom"
								style={{ width: 20, height: 20 }}
								className={ics.icon}
								onClick={handlerClearIconOnClick}
							>
								<XIcon size="custom" style={{ width: 20, height: 20 }} />
							</Icon>
						)}
						{((!onApply && value.length < 1) || onApply) && (
							<Icon
								size="custom"
								style={{ width: 20, height: 20 }}
								className={ics.icon}
								onClick={handlerSearchIconOnClick}
							>
								<SearchIcon size="custom" style={{ width: 20, height: 20 }} />
							</Icon>
						)}
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

SearchInput.displayName = 'SearchInput';

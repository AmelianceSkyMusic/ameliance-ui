import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Avatar } from '../Avatar';
import { XIcon } from '../icons/XIcon';

import s from './FileImgUpload.module.scss';

interface IProps {
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
	watch: (name: string) => FieldValues;
	placeholder?: string;
	children?: React.ReactNode;
	testId?: string;
	accept?: string;
	label?: string;
}

export function FileImgUpload({
	register,
	errors,
	watch,
	children,
	placeholder,
	testId,
	accept,
	label,
}: IProps) {
	const [image, setImage] = useState<string>();
	const files = watch(register.name);
	useEffect(() => {
		let fileImage = '';
		if (files && files.length > 0) {
			fileImage = URL.createObjectURL(files[0]);
		}
		setImage(fileImage);
	}, [files]);

	return (
		<div className={s.FileImgUpload}>
			<span className="h5">{children}</span>
			<label className={asm.join(s.container, 'p1')}>
				<input
					className={s.input}
					type="file"
					{...register}
					placeholder={placeholder}
					accept={accept || ''}
					data-testid={testId}
				/>
				{!image ? <Avatar><XIcon /></Avatar>
					: <Avatar src={image} alt={image} /> }
				{label}
			</label>
			<p className={asm.join(s.error, 'p2 input-error')}>
				{(errors && errors[register.name] && errors[register.name].message) || ''}
			</p>
		</div>
	);
}

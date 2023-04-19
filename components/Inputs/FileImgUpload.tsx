import React, { forwardRef, useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Avatar } from '../Avatar';
import { CameraIcon } from '../icons/CameraIcon';
import { Typography } from '../Typography';

import typography from '../Typography/Typography.module.scss';
import cs from './commonStyle.module.scss';
import s from './FileImgUpload.module.scss';

export type FileImgUploadElement = HTMLInputElement;

export interface FileImgUploadProps extends ReactHTMLElementAttributes<FileImgUploadElement> {
	register?: FieldValues;
	errors?: FieldErrors<TFieldValues>;
	watch?: (name: string) => FieldValues;
	accept?: string;
	label?: string;
	defaultImg?: string;
}

export const FileImgUpload = forwardRef<FileImgUploadElement, FileImgUploadProps>(({
	register,
	errors,
	watch,
	accept,
	label,
	defaultImg = '',
	children,
	className,
	...rest
}, ref) => {
	const [image, setImage] = useState<string>(defaultImg);
	const files = watch ? watch(register ? register.name : null) : null;

	const setFileImages = (filesList: FileList | null) => {
		if (filesList && filesList.length > 0) {
			if (typeof filesList === 'string') {
				setImage(filesList);
			} else {
				const fileImage = URL.createObjectURL(filesList[0]);
				setImage(fileImage);
			}
		}
	};

	useEffect(() => {
		if (watch && files) setFileImages(files as FileList);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [files]);

	const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!watch && defaultImg) setFileImages(event.target.files);
	};

	const errorMessage = errors ? errors[register?.name]?.message : '';

	return (
		<div className={asm.join(s.FileImgUpload, cs.container)}>
			<Typography component="h5">{children}</Typography>
			<div className={cs.inputBlockContainer}>
				<label className={asm.join(s.container, typography.input)}>
					<input
						type="file"
						accept={accept || ''}
						className={asm.join(s.input, className)}
						ref={ref}
						onChange={handleInputOnChange}
						{...register}
						{...rest}
					/>
					{!image ? <Avatar><CameraIcon /></Avatar>
						: <Avatar src={image} alt={image} /> }
					{label}
				</label>
				{register && (
					<Typography component="p2" className={asm.join(cs.error)}>
						{typeof errorMessage === 'string' && errorMessage}
					</Typography>
				)}
			</div>
		</div>
	);
});

FileImgUpload.displayName = 'FileImgUpload';

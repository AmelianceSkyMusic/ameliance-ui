import { forwardRef, useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldError, FieldValues } from 'react-hook-form';

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
	errors?: Record<string, FieldError> | undefined;
	watch: (name: string) => FieldValues;
	accept?: string;
	label?: string;
}

export const FileImgUpload = forwardRef<FileImgUploadElement, FileImgUploadProps>(({
	register,
	errors,
	watch,
	accept,
	label,
	children,
	className,
	...rest
}, ref) => {
	const [image, setImage] = useState<string>();
	const files = watch(register ? register.name : null);
	useEffect(() => {
		let fileImage = '';
		if (files && files.length > 0) {
			fileImage = URL.createObjectURL(files[0]);
		}
		setImage(fileImage);
	}, [files]);

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
						{...register}
						{...rest}
					/>
					{!image ? <Avatar><CameraIcon /></Avatar>
						: <Avatar src={image} alt={image} /> }
					{label}
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

FileImgUpload.displayName = 'FileImgUpload';

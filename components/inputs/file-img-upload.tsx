import { forwardRef, useEffect, useState } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import { join } from 'ameliance-scripts';

import { Avatar } from '../avatar';
import { CameraIcon } from '../icons/react/camera-icon';
import { Typography } from '../typography';

import typography from '../typography/typography.module.scss';
import cs from './common-style.module.scss';
import c from './file-img-upload.module.scss';

export type FileImgUploadElement = HTMLInputElement;

export type FileImgUploadProps = React.ComponentPropsWithoutRef<'img'> & {
	register?: FieldValues;
	errors?: FieldErrors<FieldValues>;
	watch?: (name: string) => FieldValues;
	accept?: string;
	label?: string;
	defaultImg?: string;
};

export const FileImgUpload = forwardRef<FileImgUploadElement, FileImgUploadProps>(
	(
		{ register, errors, watch, accept, label, defaultImg = '', children, className, ...rest },
		ref,
	) => {
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
			<div className={join(c.FileImgUpload, cs.container)}>
				<Typography component="h5">{children}</Typography>
				<div className={cs.inputBlockContainer}>
					<label className={join(c.container, typography.input)}>
						<input
							type="file"
							accept={accept || ''}
							className={join(c.input, className)}
							onChange={handleInputOnChange}
							{...register}
							//TODO: uncomment {...rest} and fix
							// {...rest}
							ref={ref}
						/>
						{!image ? (
							<Avatar>
								<CameraIcon />
							</Avatar>
						) : (
							<Avatar src={image} alt={image} />
						)}
						{label}
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

FileImgUpload.displayName = 'FileImgUpload';

import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './FileUpload.module.scss';

export type FileUploadElement = HTMLInputElement;

export interface FileUploadProps extends ReactHTMLElementAttributes<FileUploadElement> {
	icon: string;
}

export const FileUpload = forwardRef<FileUploadElement, FileUploadProps>(({
	children,
	className,
	...rest
}, ref) => (
	<div>
		<label htmlFor="file">
			{children}
			<input
				type="file"
				className={asm.join(s.input, className)}
				id="file"
				ref={ref}
				{...rest}
			/>
		</label>
	</div>
));

FileUpload.displayName = 'FileUpload';

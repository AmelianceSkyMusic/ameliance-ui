import { forwardRef, useEffect, useState } from 'react';

import asm from 'asm-ts-scripts';

import { Typography } from '../Typography';

import s from './Avatar.module.scss';

export type AvatarElement = HTMLDivElement;

export interface AvatarProps extends ReactHTMLElementAttributes<AvatarElement> {
	src?: string;
	alt?: string;
	char?: string;
	color?: string;
	size?: ComponentSizes;
}

export const Avatar = forwardRef<AvatarElement, AvatarProps>(({
	src,
	alt,
	char,
	color,
	size = 'default',
	onClick,
	children,
	className,
	...rest
}, ref) => {
	const [imgUrl, setImgUrl] = useState('');

	useEffect(() => {
		if (src) setImgUrl(src);
	}, [src]);

	const componentClass = [
		onClick && s.clickable,
	];

	const sizeClass = size && s[size];

	const handleImageOnError = () => {
		setImgUrl('');
	};

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			onClick={onClick}
			className={asm.join(s.Avatar, className, componentClass)}
			ref={ref}
			{...rest}
		>
			{(!imgUrl && children) && (
				<div
					className={asm.join(s.charContainer, sizeClass)}
					style={{ backgroundColor: color }}
				>
					{children}
				</div>
			)}
			{imgUrl && (
				<img
					className={asm.join(s.img, sizeClass)}
					src={imgUrl}
					alt={alt}
					onError={handleImageOnError}
				/>
			)}
			{!imgUrl && !children
					&& (
						<div
							className={asm.join(s.charContainer, sizeClass)}
							style={{ backgroundColor: color }}
						>
							<Typography display="h5" className={s.char}>
								{char}
							</Typography>
						</div>
					)}
		</div>
	);
});

Avatar.displayName = 'Avatar';

import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

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
	const componentClass = [
		onClick && 'clickable',
	];

	const sizeClass = size && s[size];

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			onClick={onClick}
			className={asm.join(s.Avatar, className, componentClass)}
			ref={ref}
			{...rest}
		>
			{(!src && children) && (
				<div
					className={asm.join(s.charContainer, sizeClass)}
					style={{ backgroundColor: color }}
				>
					{children}
				</div>
			)}
			{src && <img className={asm.join(s.img, sizeClass)} src={src} alt={alt} />}
			{!src && !children
					&& (
						<div
							className={asm.join(s.charContainer, sizeClass)}
							style={{ backgroundColor: color }}
						>
							<h5 className={asm.join(s.char, 'h5')}>
								{char}
							</h5>
						</div>
					)}
		</div>
	);
});

Avatar.displayName = 'Avatar';

// import asm from 'asm-ts-scripts';

// import s from './Avatar.module.scss';

// interface Props {
// 	src?: string;
// 	alt?: string;
// 	char?: string;
// 	color?: string;
// 	size?: 'normal' | 'small';
// 	onClick?: () => void;
// 	icon?: string;
// }

// export function Avatar({
// 	src, alt, char, color, size = 'normal', onClick, icon,
// }: Props) {
// 	const smallClass = size === 'small' && s.small;

// 	return (
// 		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
// 		<div className={onClick ? 'clickable' : ''} onClick={onClick}>
// 			{(!src && icon) && (
// 				<div
// 					className={asm.join(s.charContainer, smallClass)}
// 					style={{ backgroundColor: color }}
// 				>
// 					<span className={asm.join('icon', icon)} />
// 				</div>
// 			)}
// 			{src && <img className={asm.join(s.img, smallClass)} src={src} alt={alt} />}
// 			{!src && !icon
// 					&& (
// 						<div
// 							className={asm.join(s.charContainer, smallClass)}
// 							style={{ backgroundColor: color }}
// 						>
// 							<h5 className={asm.join(s.char, 'h5')}>
// 								{char}
// 							</h5>
// 						</div>
// 					)}
// 		</div>
// 	);
// }

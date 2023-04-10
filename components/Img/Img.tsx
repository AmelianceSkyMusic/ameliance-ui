import { forwardRef, useState } from 'react';

export type ImgElement = HTMLImageElement;

export interface ImgProps extends ReactHTMLElementAttributes<
ImgElement, React.ImgHTMLAttributes<ImgElement>> {
	fallbackScr?: string;
	src: string;
	alt: string;
}

export const Img = forwardRef<ImgElement, ImgProps>(({
	className,
	src,
	alt,
	fallbackScr,
	onError,
	...rest
}, ref) => {
	const [imgSrc, setImgSrc] = useState(src);

	const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		if (onError) onError(event);
		if (fallbackScr) setImgSrc(fallbackScr);
	};

	return (
		<img
			className={className}
			src={imgSrc}
			alt={alt}
			onError={imageOnErrorHandler}
			ref={ref}
			{...rest}
		/>
	);
});

Img.displayName = 'Img';

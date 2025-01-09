import { useEffect, useState } from 'react';

import type { ImageProps } from 'next/image';
import Image from 'next/image';

import { useScrollLock } from '~/submodules/ameliance-ui/hooks/use-scroll-lock';

import { Button } from '../../../button';
import { RotateCwIcon } from '../../../icons/react/rotate-cw-icon';

import c from './zoom-image.module.scss';

type ZoomImageProps = ImageProps;

export function ZoomImage({ src, alt, ...props }: ZoomImageProps) {
	const [isOpen, setIsOpen] = useState(false);

	const [rotation, setRotation] = useState(0);

	const handleRotate = (event: React.MouseEvent) => {
		event.stopPropagation();
		setRotation((prevRotation) => prevRotation + 90);
	};

	const { lockScroll, unlockScroll } = useScrollLock();

	useEffect(() => {
		if (isOpen) {
			lockScroll();
		} else {
			unlockScroll();
		}
		return () => {
			unlockScroll();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	return (
		<>
			<Image
				className={c.image}
				alt={alt}
				src={src}
				width={0}
				height={0}
				sizes="100vw"
				onClick={() => setIsOpen(true)}
				{...props}
			/>

			{isOpen && (
				<div className={c.lightbox} onClick={() => setIsOpen(false)}>
					<div
						className={c.imageWrapper}
						style={{
							transform: `rotate(${rotation}deg)`,
						}}
					>
						<Image
							alt={alt}
							src={src}
							fill
							style={{
								objectFit: 'contain',
							}}
						/>
					</div>

					<Button className={c.rotateButton} onClick={handleRotate}>
						<RotateCwIcon />
					</Button>
				</div>
			)}
		</>
	);
}

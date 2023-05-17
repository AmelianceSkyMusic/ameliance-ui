import {
	forwardRef, useEffect, useState,
} from 'react';

import asm from 'asm-ts-scripts';

import { useScroll } from '~hooks/useScroll';
import { useWindowSize } from '~hooks/useWindowSize';

import { Portal } from '../Portal';

import s from './StickyButton.module.scss';

export type StickyButtonElement = HTMLDivElement;

export interface StickyButtonProps extends ReactHTMLElementAttributes<StickyButtonElement> {
	animation?: 'popup' | 'slide-in';
	inverseDirection?: boolean;
	hideOnScreensCount?: number;
	offset?: number;
}

export const StickyButton = forwardRef<StickyButtonElement, StickyButtonProps>(({
	animation,
	inverseDirection,
	hideOnScreensCount,
	offset,
	children,
	className,
	...rest
}, ref) => {
	const [animationClass, setAnimationClass] = useState(s.hide);

	const { windowHeight } = useWindowSize();

	const { scrollDirection, scrollPosition } = useScroll(200);

	useEffect(() => {
		const isScreenHide = scrollPosition > windowHeight * (hideOnScreensCount || 1);

		if (isScreenHide && inverseDirection && scrollDirection === 'up') {
			setAnimationClass(s.show);
		} else if (isScreenHide && inverseDirection && scrollDirection === 'down') {
			setAnimationClass(s.hide);
		} else if (isScreenHide && scrollDirection === 'up') {
			setAnimationClass(s.hide);
		} else if (isScreenHide && scrollDirection === 'down') {
			setAnimationClass(s.show);
		} else {
			setAnimationClass(s.hide);
		}
	}, [hideOnScreensCount, inverseDirection, scrollDirection, scrollPosition, windowHeight]);

	const componentClass = [
		animation && animationClass,
		animation === 'slide-in' && s.slideIn,
		animation === 'popup' && s.popup,
	];

	const [isChangeOffset, setIsChangeOffset] = useState(false);

	const moveOffsetClass = isChangeOffset && s.moveOffset;

	useEffect(() => {
		if (offset) {
			setIsChangeOffset(true);
		} else {
			setIsChangeOffset(false);
		}
	}, [offset]);

	return (
		<Portal>
			<div
				className={asm.join(
					s.StickyButton,
					className,
					componentClass,
					moveOffsetClass,
				)}
				ref={ref}
				style={{
					'--sticky-button-offset': offset ? `calc(${offset}px * -1)` : 'var(--sticky-button-offset-init)',
					'--sticky-button-offset-prev:': 'var(--sticky-button-offset)',
				} as React.CSSProperties}
				{...rest}
			>
				{children}
			</div>
		</Portal>
	);
});

StickyButton.displayName = 'StickyButton';

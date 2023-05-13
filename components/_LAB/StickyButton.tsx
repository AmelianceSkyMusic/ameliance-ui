import {
	forwardRef, useEffect, useRef, useState,
} from 'react';

import asm from 'asm-ts-scripts';

import { useScroll } from '~hooks/useScroll';
import { useWindowSize } from '~hooks/useWindowSize';

import { mergeRefs } from '~/ameliance-ui/helpers/mergeRefs';

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

	const stickyButtonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (stickyButtonRef && offset) stickyButtonRef.current?.style.setProperty('--sticky-button-offset', `${offset}px`);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stickyButtonRef, offset]);

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

	return (
		<Portal>
			<div
				className={asm.join(s.StickyButton, className, componentClass)}
				ref={mergeRefs([ref, stickyButtonRef])}
				{...rest}
			>
				{children}
			</div>
		</Portal>
	);
});

StickyButton.displayName = 'StickyButton';

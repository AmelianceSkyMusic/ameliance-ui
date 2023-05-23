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
	offset?: number | null;
}

export const StickyButton = forwardRef<StickyButtonElement, StickyButtonProps>(({
	animation,
	inverseDirection,
	hideOnScreensCount,
	offset,
	children,
	className,
	style,
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

	const [offsetVar, setOffsetVar] = useState<string>();

	const stickyButtonRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (stickyButtonRef && typeof offset === 'number') {
			// stickyButtonRef.current?.style.setProperty('--sticky-button-offset', `calc(${offset}px * -1)`);
			setOffsetVar(`calc(${offset}px * -1)`);
		} else {
			setOffsetVar('var(--sticky-button-offset-init)');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stickyButtonRef, offset]);

	return (
		<Portal>
			<div
				className={asm.join(
					s.StickyButton,
					className,
					componentClass,
				)}
				ref={mergeRefs([ref, stickyButtonRef])}
				style={{
					...style,
					'--sticky-button-offset': offsetVar,
				} as React.CSSProperties}
				{...rest}
			>
				<div className={s.children}>
					{children}
				</div>
			</div>
		</Portal>
	);
});

StickyButton.displayName = 'StickyButton';

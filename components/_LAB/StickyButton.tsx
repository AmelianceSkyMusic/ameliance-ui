import { useEffect, useRef, useState } from 'react';

import asm from 'asm-ts-scripts';

import { useScroll } from '~hooks/useScroll';
import { useWindowSize } from '~hooks/useWindowSize';

import s from './StickyButton.module.scss';

interface StickyButton {
	children: React.ReactNode;
	popup?: boolean;
	inverseDirection?: boolean;
	hideOnScreensCount?: number;
	offset?: number;
}

export function StickyButton({
	children, popup, inverseDirection, offset, hideOnScreensCount = 0,
}: StickyButton) {
	const [animationClass, setAnimationClass] = useState(s.hide);

	const stickyButtonRef = useRef<HTMLDivElement>(null);

	// const [animationClass, setAnimationClass] = useState(initHide ? s.hide : '');

	// useEffect(() => {
	// 	setAnimationClass((prev) => asm.join(s.initAnimation, prev));
	// }, []);
	useEffect(() => {
		if (stickyButtonRef && offset) stickyButtonRef.current?.style.setProperty('--sticky-button-offset', `${offset}px`);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stickyButtonRef, offset]);

	const { windowHeight } = useWindowSize();

	const { scrollDirection, scrollPosition } = useScroll(200);

	useEffect(() => {
		const isScreenHide = scrollPosition > windowHeight * hideOnScreensCount;

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

	return (
		<div className={asm.join(s.StickyButton, popup && animationClass)} ref={stickyButtonRef}>
			{children}
		</div>
	);
}

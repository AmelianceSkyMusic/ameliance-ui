import { forwardRef, useEffect, useRef, useState } from 'react';

import { join } from 'ameliance-scripts';

import { mergeRefs } from '../../helpers/merge-refs';
import { Portal } from '../portal';
import { useScroll } from './use-scroll';
import { useWindowSize } from './use-window-size';

import c from './sticky-button.module.scss';

export type StickyButtonElement = HTMLDivElement;

export type StickyButtonProps = React.ComponentPropsWithoutRef<'div'> & {
	animation?: 'popup' | 'slide-in';
	inverseDirection?: boolean;
	hideOnScreensCount?: number;
	offset?: number | null;
};

export const StickyButton = forwardRef<StickyButtonElement, StickyButtonProps>(
	(
		{
			animation,
			inverseDirection,
			hideOnScreensCount,
			offset,
			children,
			className,
			style,
			...rest
		},
		ref,
	) => {
		const [animationClass, setAnimationClass] = useState(c.hide);

		const { windowHeight } = useWindowSize();

		const { scrollDirection, scrollPosition } = useScroll(200);

		useEffect(() => {
			const isScreenHide = scrollPosition > windowHeight * (hideOnScreensCount || 1);

			if (isScreenHide && inverseDirection && scrollDirection === 'up') {
				setAnimationClass(c.show);
			} else if (isScreenHide && inverseDirection && scrollDirection === 'down') {
				setAnimationClass(c.hide);
			} else if (isScreenHide && scrollDirection === 'up') {
				setAnimationClass(c.hide);
			} else if (isScreenHide && scrollDirection === 'down') {
				setAnimationClass(c.show);
			} else {
				setAnimationClass(c.hide);
			}
		}, [hideOnScreensCount, inverseDirection, scrollDirection, scrollPosition, windowHeight]);

		const componentClass = [
			animation && animationClass,
			animation === 'slide-in' && c.slideIn,
			animation === 'popup' && c.popup,
		];

		const [offsetVar, setOffsetVar] = useState<string>();

		const stickyButtonRef = useRef<HTMLDivElement>(null);
		useEffect(() => {
			if (stickyButtonRef && typeof offset === 'number') {
				setOffsetVar(`calc(${offset}px * -1)`);
			} else {
				setOffsetVar('var(--sticky-button-offset-init)');
			}
		}, [stickyButtonRef, offset]);

		return (
			<Portal>
				<div
					className={join(c.root, className, componentClass)}
					ref={mergeRefs([ref, stickyButtonRef])}
					style={
						{
							...style,
							'--sticky-button-offset': offsetVar,
						} as React.CSSProperties
					}
					{...rest}
				>
					<div className={c.children}>{children}</div>
				</div>
			</Portal>
		);
	},
);

StickyButton.displayName = 'StickyButton';

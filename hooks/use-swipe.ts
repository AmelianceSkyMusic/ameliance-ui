import { useEffect, useState } from 'react';

type Position = {
	x: number;
	y: number;
} | null;

type Direction = 'left' | 'right' | 'up' | 'down' | null;

interface UseSwipeParams {
	ref: React.RefObject<HTMLElement>;
	wayDirection?: 'horizontal' | 'vertical';
	targetDirection?: Direction;
	swipeOffset?: number;
	moveOffset?: number;
}

interface UseSwipeReturn {
	startTouchPosition?: Position;
	moveTouchPosition: Position;
	endTouchPosition: Position;
	swipeDirection: Direction;
	moveDirection: Direction;
	difference: number | null;
}

export function useSwipe({
	ref,
	wayDirection = 'horizontal',
	targetDirection = null,
	swipeOffset = 10,
	moveOffset = 1,
}: UseSwipeParams): UseSwipeReturn {
	const [elementPosition]	= useState(ref.current?.style.position || 'static');
	const [startTouchPosition, setStartTouchPosition]	= useState<UseSwipeReturn['startTouchPosition']>(null);
	const [moveTouchPosition, setMoveTouchPosition]	= useState<UseSwipeReturn['moveTouchPosition']>(null);
	const [endTouchPosition, setEndTouchPosition]	= useState<UseSwipeReturn['endTouchPosition']>(null);
	const [swipeDirection, setSwipeDirection]	= useState<UseSwipeReturn['swipeDirection']>(null);
	const [moveDirection, setMoveDirection]	= useState<UseSwipeReturn['moveDirection']>(null);
	const [difference, setDifference]	= useState<UseSwipeReturn['difference']>(null);

	useEffect(() => {
		const elem = ref?.current;
		let startTouchX: number | null = null;
		let startTouchY: number | null = null;

		const handleTouchStart = (event: TouchEvent) => {
			startTouchX = event.touches[0].clientX;
			startTouchY = event.touches[0].clientY;
			setStartTouchPosition({ x: startTouchX, y: startTouchY });
		};

		const handleTouchMove = (event: TouchEvent) => {
			const moveTouchX = event.touches[0].clientX;
			const moveTouchY = event.touches[0].clientY;
			setMoveTouchPosition({ x: moveTouchX, y: moveTouchY });
			if (startTouchX === null || startTouchY === null) return;
			let diff: number | null = null;
			if (wayDirection === 'horizontal') {
				diff = moveTouchX - startTouchX;
				if (diff > moveOffset) setMoveDirection('right');
				if (diff < moveOffset) setMoveDirection('left');
			} else if (wayDirection === 'vertical') {
				diff = moveTouchY - startTouchY;
				if (diff > moveOffset) setMoveDirection('down');
				if (diff < moveOffset) setMoveDirection('up');
			}
			setDifference(diff);
		};

		const handleTouchEnd = (event: TouchEvent) => {
			const endTouchX = event.changedTouches[0].clientX;
			const endTouchY = event.changedTouches[0].clientY;
			setEndTouchPosition({ x: endTouchX, y: endTouchY });
			if (startTouchX === null || startTouchY === null) return;

			if (wayDirection === 'horizontal') {
				const diff = endTouchX - startTouchX;
				if (diff > swipeOffset) setSwipeDirection('right');
				if (diff < swipeOffset) setSwipeDirection('left');
			} else if (wayDirection === 'vertical') {
				const diff = endTouchY - startTouchY;
				if (diff > swipeOffset) setSwipeDirection('down');
				if (diff < swipeOffset) setSwipeDirection('up');
			}
			setStartTouchPosition(null);
		};

		if (elem) {
			elem.addEventListener('touchstart', handleTouchStart);
			elem.addEventListener('touchmove', handleTouchMove);
			elem.addEventListener('touchend', handleTouchEnd);
		}

		return () => {
			if (elem) {
				elem.removeEventListener('touchstart', handleTouchStart);
				elem.removeEventListener('touchstart', handleTouchStart);
				elem.removeEventListener('touchend', handleTouchEnd);
			}
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const elem = ref?.current;
		if (elem && targetDirection) {
			if (moveDirection === targetDirection) {
				elem.style.position = 'relative';
				elem.style.left = `${difference}px`;
			} else {
				elem.style.position = elementPosition;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [difference, moveDirection]);

	return {
		startTouchPosition,
		moveTouchPosition,
		endTouchPosition,
		swipeDirection,
		moveDirection,
		difference,
	};
}

import { useState } from 'react';

type UseAnimation = {
	startAnimationClass?: string;
	endAnimationClass?: string;
	onAnimationEndAction: () => void;
	autostart?: boolean;
};

type UseAnimationReturn = {
	animationClass: string | undefined;
	currentAnimation: 'start' | 'end';
	handleOnAnimationEnd: () => void;
	runStartAnimation: () => void;
	runEndAnimation: () => void;
};

export function useAnimation({
	startAnimationClass,
	endAnimationClass,
	onAnimationEndAction,
	autostart = true,
}: UseAnimation): UseAnimationReturn {
	const [isStartAnimation, setIsStartAnimation] = useState(autostart);

	const animationClass = isStartAnimation ? startAnimationClass : endAnimationClass;

	const handleOnAnimationEnd = () => {
		if (!isStartAnimation) {
			onAnimationEndAction();
		}
	};

	const runStartAnimation = () => {
		setIsStartAnimation(true);
	};

	const runEndAnimation = () => {
		setIsStartAnimation(false);
	};

	return {
		animationClass,
		handleOnAnimationEnd,
		runStartAnimation,
		runEndAnimation,
		currentAnimation: isStartAnimation ? 'start' : 'end',
	};
}

// MAX VERSION
// interface UseAnimation {
// 	animationClasses: Record<string, string>;
// 	onAnimationEndAction: () => void;
// 	autostartAnimation?: string;
// 	endAnimation?: string;
// }

// interface UseAnimationReturn {
// 	animationClass: string | null;
// 	currentAnimation: string | null;
// 	handleOnAnimationEnd: () => void;
// 	runAnimation: (animation: string) => void;
// }

// export function useAnimation({
// 	animationClasses,
// 	onAnimationEndAction,
// 	autostartAnimation,
// 	endAnimation,
// }: UseAnimation): UseAnimationReturn {
// 	const [currentAnimation, setCurrentAnimation] = useState(autostartAnimation || null);

// 	const animationClass = (currentAnimation && currentAnimation in animationClasses)
// 		? animationClasses[currentAnimation]
// 		: null;

// 	const handleOnAnimationEnd = () => {
// 		if (currentAnimation === endAnimation) {
// 			onAnimationEndAction();
// 		}
// 	};

// 	const runAnimation = (animation: string) => {
// 		setCurrentAnimation(animation);
// 	};

// 	return {
// 		animationClass,
// 		handleOnAnimationEnd,
// 		runAnimation,
// 		currentAnimation,
// 	};
// }

// USAGE IN SCSS
// .MusicPlayer {
// 	&.show {
// 		animation: show-player 0.4s forwards;
// 	}
// 	&.hide {
// 		animation: hide-player 0.4s forwards;
// 	}
// }
// @keyframes show-player {
// 	0% {
// 		transform: translateY(100%);
// 	}
// 	100% {
// 		transform: translateY(0%);
// 	}
// }
// @keyframes hide-player {
// 	0% {
// 		transform: translateY(0%);
// 	}
// 	100% {
// 		transform: translateY(100%);
// 	}
// }

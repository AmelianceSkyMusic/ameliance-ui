import { useEffect, useState } from 'react';

interface UseTransition {
	startTransitionClass: string;
	// endTransitionClass: string;
	onTransitionEndAction: () => void;
	autostart?: boolean;
}

interface UseTransitionReturn {
	transitionClass: string | null;
	handleOnTransitionEnd: () => void;
	runStartTransition: () => void;
	runEndTransition: () => void;
}

export function useTransition({
	startTransitionClass,
	// endTransitionClass,
	onTransitionEndAction,
	autostart = true,
}: UseTransition): UseTransitionReturn {
	const [isStartAnimation, setIsStartAnimation] = useState(false);

	useEffect(() => {
		if (autostart) setIsStartAnimation(true);
	}, [autostart]);

	const transitionClass = isStartAnimation ? startTransitionClass : null;

	const handleOnTransitionEnd = () => {
		if (!isStartAnimation) {
			onTransitionEndAction();
		}
	};

	const runStartTransition = () => {
		setIsStartAnimation(true);
	};

	const runEndTransition = () => {
		setIsStartAnimation(false);
	};

	return {
		transitionClass,
		handleOnTransitionEnd,
		runStartTransition,
		runEndTransition,
	};
}

// USAGE IN SCSS
// .MusicPlayer {
// 	transition: transform 0.2s ease-in;
// 	transform: translateY(100%);
// 	&.show {
// 		transition: transform 0.2s ease-out;
// 		transform: translateY(0%);
// 	}
// }

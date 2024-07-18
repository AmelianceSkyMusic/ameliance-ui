export const removeBlackout = (blackout$: HTMLElement) => {
	blackout$.classList.remove('show');
	blackout$.addEventListener('animationend', () => {
		const zeroBlock$ = blackout$.closest('.zero-block') as HTMLDivElement;
		zeroBlock$.remove();
	});
};

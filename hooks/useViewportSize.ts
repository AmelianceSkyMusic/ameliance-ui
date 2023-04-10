import { useEffect, useState } from 'react';

function setViewportSizeVariable(vh: number | null, vw: number | null) {
	if (vh) document.documentElement.style.setProperty('--vh', `${vh}px`);
	if (vw) document.documentElement.style.setProperty('--vw', `${vw}px`);
}

export function useViewportSize() {
	const hasWindow = typeof window !== 'undefined';

	function getViewportHeightVariable() {
		const vh = hasWindow ? window.innerHeight : null;
		return vh;
	}
	function getViewportWidthVariable() {
		const wh = hasWindow ? window.innerWidth : null;
		return wh;
	}

	const [viewportHeight, setViewportHeight] = useState(getViewportHeightVariable());
	const [viewportWidth, setViewportWidth] = useState(getViewportWidthVariable());

	useEffect(() => {
		setViewportSizeVariable(viewportHeight, viewportWidth);
	}, [viewportHeight, viewportWidth]);

	useEffect(() => {
		// Re-calculate on resize
		window.addEventListener('resize', () => setViewportHeight(getViewportHeightVariable()));
		return () => window.addEventListener('resize', () => setViewportHeight(getViewportHeightVariable()));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasWindow]);

	useEffect(() => {
		// Re-calculate on resize
		window.addEventListener('orientationchange', () => setViewportHeight(getViewportHeightVariable()));
		return () => window.addEventListener('orientationchange', () => setViewportHeight(getViewportHeightVariable()));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasWindow]);

	useEffect(() => {
		// Re-calculate on resize
		window.addEventListener('resize', () => setViewportWidth(getViewportWidthVariable()));
		return () => window.addEventListener('resize', () => setViewportWidth(getViewportWidthVariable()));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasWindow]);

	useEffect(() => {
		// Re-calculate on resize
		window.addEventListener('orientationchange', () => setViewportWidth(getViewportWidthVariable()));
		return () => window.addEventListener('orientationchange', () => setViewportWidth(getViewportWidthVariable()));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasWindow]);

	return { viewportHeight, viewportWidth };
}

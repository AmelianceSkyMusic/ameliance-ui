import { useEffect, useState } from 'react';

export function useIsScrollbar() {
	const [isScrollbar, setIsScrollbar] = useState(window.innerWidth - document.body.offsetWidth);
	useEffect(() => {
		setIsScrollbar(window.innerWidth - document.body.offsetWidth);
	}, []);
	console.log('isScrollbar:', isScrollbar);
}

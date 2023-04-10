import { useLayoutEffect, useState } from 'react';

export function useInitTheme(localStorageState?: string) {
	const [theme, setTheme] = useState<string>();

	useLayoutEffect(() => {
		document.body.classList.add('no-transition');
		const storedTheme = localStorageState
			|| (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

		setTheme(storedTheme);
		document.documentElement.setAttribute('data-theme', storedTheme);
		setTimeout(() => document.body.classList.remove('no-transition'), 0);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { theme };
}

// import { useEffect, useLayoutEffect, useState } from 'react';

// type ThemeMode = 'dark' | 'light';

// export function useTheme(storedThemeMode?: ThemeMode) {
// 	const [theme, setTheme] = useState<ThemeMode>();
// 	console.log('theme: ', theme);

// 	const setNewThemeMode = (newTheme: ThemeMode) => {
// 		document.body.classList.add('no-transition');
// 		document.documentElement.setAttribute('data-theme', newTheme);
// 		setTheme(newTheme);
// 		setTimeout(() => document.body.classList.remove('no-transition'), 0);
// 	};

// 	useLayoutEffect(() => {
// 		document.body.classList.add('no-transition');
// 		const currentTheme = document.documentElement.getAttribute('data-theme');
// 		console.log('currentTheme: ', currentTheme);
// 		let storedTheme;
// 		if (!currentTheme) {
// 			storedTheme = storedThemeMode
// 			|| (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
// 			document.documentElement.setAttribute('data-theme', storedTheme);
// 			// setTimeout(() => document.body.classList.remove('no-transition'), 0);
// 			console.log('storedTheme: ', storedTheme);
// 		}
// 		setTheme(storedTheme);
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, []);

// 	// const toggleTheme = () => {
// 	// 	document.body.classList.add('no-transition');
// 	// 	const currentTheme = document.documentElement.getAttribute('data-theme');
// 	// 	const newTheme = currentTheme === 'light' ? 'dark' : 'light';
// 	// 	document.documentElement.setAttribute('data-theme', newTheme);
// 	// 	// setNewThemeMode(newTheme);
// 	// 	setTheme(newTheme);
// 	// 	setTimeout(() => document.body.classList.remove('no-transition'), 0);
// 	// 	return newTheme;
// 	// };

// 	return { theme };
// }

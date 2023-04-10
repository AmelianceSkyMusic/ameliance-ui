export function toggleTheme(): 'light' | 'dark' {
	// document.body.classList.add('no-transition');
	const currentTheme = document.documentElement.getAttribute('data-theme');
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
	document.documentElement.setAttribute('data-theme', newTheme);
	// setTimeout(() => document.body.classList.remove('no-transition'), 0);
	return newTheme;
}

export function setTheme(theme: 'light' | 'dark' | 'auto'): void {
	// document.body.classList.add('no-transition');
	document.documentElement.setAttribute('data-ameliance-ui-theme', theme);
	// setTimeout(() => document.body.classList.remove('no-transition'), 0);
}

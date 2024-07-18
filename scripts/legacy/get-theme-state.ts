export function getThemeState() {
	let targetTheme = 'light';
	if (localStorage.getItem('theme') !== null) {
		targetTheme = localStorage.getItem('theme') as string;
	}
	return targetTheme;
}

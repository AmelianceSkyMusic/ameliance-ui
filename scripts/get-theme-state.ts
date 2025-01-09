type GetThemeStateReturn = 'light' | 'dark' | 'auto' | undefined;

export function getThemeState(): GetThemeStateReturn {
	if (typeof document === 'undefined') return;
	const theme = document.documentElement.getAttribute('data-ameliance-ui-theme');
	if (theme && (theme === 'light' || theme === 'dark' || theme === 'auto')) {
		return theme;
	}
}

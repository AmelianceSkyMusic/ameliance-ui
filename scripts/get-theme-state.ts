interface GetThemeStateReturn {
	theme: 'light' | 'dark' | null;
}

export function getThemeState(): GetThemeStateReturn {
	return { theme: document.documentElement.getAttribute('data-theme') as 'light' | 'dark' };
}

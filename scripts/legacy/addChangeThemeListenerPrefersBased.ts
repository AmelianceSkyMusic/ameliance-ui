const toggleTheme = () => {
	document.body.classList.add('no-transition');

	const currentTheme$ = document.documentElement.getAttribute('data-theme');

	let targetTheme = 'light';
	if (currentTheme$ === 'light') targetTheme = 'dark';
	document.documentElement.setAttribute('data-theme', targetTheme);

	setTimeout(() => document.body.classList.remove('no-transition'), 0);

	localStorage.setItem('theme', targetTheme);
};

export function addChangeThemeListener<T extends HTMLElement>(element: T) {
	const storedTheme = localStorage.getItem('theme')
		|| (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

	if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme);

	element.addEventListener('click', toggleTheme);
}

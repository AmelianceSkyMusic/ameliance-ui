export function addStyleToHTML(style: string, index: string): void {
	const sheet = document.createElement('style');
	sheet.setAttribute('data-style-id', index);
	sheet.innerHTML =	style;
	document.body.appendChild(sheet);
}

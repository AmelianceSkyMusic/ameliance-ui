import { useLayoutEffect } from 'react';

import { addStyleToHTML } from '~/asmlib/scripts/addStyleToHTML';

type UseSvgIcons = string[];

export function useSvgIcons(...iconsPaths: UseSvgIcons): void {
	useLayoutEffect(() => {
		const styles = iconsPaths.map((path) => {
			const iconName = path.split('/').at(-1)?.split('.').at(0);
			return `.${iconName} {
		mask-image: url("${path}");
		-webkit-mask-image: url("${path}");
	}`;
		});

		addStyleToHTML(styles.join('\n'), 'icons');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}

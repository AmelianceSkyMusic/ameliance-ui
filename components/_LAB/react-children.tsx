import { Children, cloneElement, isValidElement } from 'react';

import type { ReactHTMLElementAttributes } from '../types/react-html-element-attributes';

export type ReactChildrenElement = HTMLElement;

export type ReactChildrenProps = ReactHTMLElementAttributes<ReactChildrenElement>;

export function ReactChildren({ children, ...rest }: ReactChildrenProps) {
	return (
		<>
			{Children.map(children, (child) => {
				if (!isValidElement(child)) return null;
				return cloneElement(child, {
					...child.props,
					...rest,
				});
			})}
		</>
	);
}

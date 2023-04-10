import { Children, cloneElement, isValidElement } from 'react';

export type ReactChildrenElement = HTMLElement;

export type ReactChildrenProps = ReactHTMLElementAttributes<ReactChildrenElement>;

export function ReactChildren({
	children,
	...rest
}: ReactChildrenProps) {
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

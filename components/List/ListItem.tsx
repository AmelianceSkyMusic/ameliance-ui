import { forwardRef } from 'react';

export type ListItemElement = HTMLLIElement;

export type ListItemProps = ReactHTMLElementAttributes<ListItemElement>;

export const ListItem = forwardRef<ListItemElement, ListItemProps>(({
	children,
	className,
	...rest
}, ref) => (
	<li
		className={className}
		ref={ref}
		{...rest}
	>
		{children}
	</li>
));

ListItem.displayName = 'ListItem';

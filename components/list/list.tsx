// import { forwardRef } from 'react';

// import { join } from 'ameliance-scripts';

// import { ReactChildren } from '../_LAB/react-children';

// import c from './list.module.scss';

// export type List2Element = HTMLUList2Element | HTMLOList2Element;

// export type List2Props = React.ComponentPropsWithoutRef<'ul'> &
// 	React.ComponentPropsWithoutRef<'ol'> & {
// 		type?: 'unordered' | 'ordered' | 'custom' | 'empty';
// 		margin?: number;
// 	};

// export const List2 = forwardRef<List2Element, List2Props>(
// 	({ type = 'unordered', margin, children, className, ...rest }, ref) => {
// 		const componentClass = [type === 'unordered' && c[type], type === 'custom' && c[type]];

// 		const componentStyle = {
// 			marginLeft: margin && `${margin}px`,
// 		};

// 		return (
// 			<>
// 				{type === 'ordered' ? (
// 					<ol
// 						className={join(c.root, className, componentClass)}
// 						style={componentStyle}
// 						{...rest}
// 						ref={ref}
// 					>
// 						<ReactChildren style={componentStyle}>{children}</ReactChildren>
// 					</ol>
// 				) : (
// 					<ul
// 						className={join(c.root, className, componentClass)}
// 						style={componentStyle}
// 						{...rest}
// 						ref={ref}
// 					>
// 						<ReactChildren style={componentStyle}>{children}</ReactChildren>
// 					</ul>
// 				)}
// 			</>
// 		);
// 	},
// );

// List2.displayName = 'List2';

import type { ElementType } from 'react';
import { forwardRef } from 'react';

import { getMatch, join } from 'ameliance-scripts';

import { Component } from '../_LAB/component';

import c from './list.module.scss';

export type ListElement = HTMLUListElement | HTMLOListElement | HTMLDListElement;

export type ListProps = React.ComponentPropsWithoutRef<'ul'> &
	React.ComponentPropsWithoutRef<'ol'> &
	React.ComponentPropsWithoutRef<'dl'> & {
		component?: ElementType;
		margin?: number;
		variant?: 'unordered' | 'ordered' | 'description' | 'plain';
	};

export const List = forwardRef<ListElement, ListProps>(
	({ component, margin, variant = 'unordered', children, className, ...rest }, ref) => {
		const componentClass = [c[variant]];

		const listComponent =
			component ||
			getMatch<string, ElementType>(variant, {
				unordered: 'ul',
				ordered: 'ol',
				description: 'dl',
				_: 'ul',
			});

		const componentStyle = {
			marginLeft: margin && `${margin}px`,
		};

		const attributes = {
			className: join(c.root, className, componentClass),
			style: componentStyle,
			ref,
			...rest,
		};

		return (
			<Component as={listComponent} {...attributes}>
				{children}
			</Component>
		);
	},
);

List.displayName = 'List';

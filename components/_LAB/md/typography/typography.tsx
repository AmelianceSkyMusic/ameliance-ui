import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type {
	TypographyElement as TypographyComponentElement,
	TypographyProps as TypographyComponentProps,
} from '../../../typography';
import { Typography as TypographyComponent } from '../../../typography';

import c from './typography.module.scss';

export type TypographyElement = TypographyComponentElement;

export type TypographyProps = TypographyComponentProps;

export const Typography = forwardRef<TypographyElement, TypographyProps>(
	({ component, className, children, ...rest }, ref) => {
		const componentClass = component ? c[component] : c.p1;
		return (
			<TypographyComponent
				component={component}
				className={join(c.typography, componentClass, className)}
				ref={ref}
				{...rest}
			>
				{children}
			</TypographyComponent>
		);
	},
);

Typography.displayName = 'Typography';

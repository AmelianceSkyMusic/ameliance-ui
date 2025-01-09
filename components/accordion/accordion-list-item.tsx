import { forwardRef, useRef } from 'react';

import { join } from 'ameliance-scripts';

import { Block } from '../blocks/block';
import { ChevronDownIcon } from '../icons/react/chevron-down-icon';
import type { ComponentSizesLegacy } from '../types/component-sizes-legacy';
import type { TypographyVariants } from '../typography';
import { Typography } from '../typography';

import c from './accordion-list-item.module.scss';

export type AccordionListItemElement = HTMLLIElement;

export type AccordionListItemProps = React.ComponentPropsWithoutRef<'li'> & {
	heading: string | string[];
	text?: string | string[];
	headingComponent?: TypographyVariants;
	textComponent?: TypographyVariants;
	active: boolean;
	fullwidth?: boolean;
	iconSize?: ComponentSizesLegacy;
	onToggle: () => void;
	disabled?: boolean;
};

export const AccordionListItem = forwardRef<AccordionListItemElement, AccordionListItemProps>(
	(
		{
			heading,
			text,
			headingComponent,
			textComponent,
			active,
			fullwidth,
			iconSize,
			onToggle,
			disabled,
			className,
			children,
			...rest
		},
		ref,
	) => {
		const textContentRef = useRef<HTMLDivElement>(null);

		const componentClass = [disabled && c.disabled, active && c.active, fullwidth && c.fullwidth];

		const textContentStyle = active
			? { height: textContentRef.current?.scrollHeight }
			: { height: '0px' };

		return (
			<li className={join(c.root, className, componentClass)} ref={ref} {...rest}>
				<Block className={join(c.heading, c.clickable)} onClick={onToggle}>
					<ChevronDownIcon size={iconSize} />
					{typeof heading === 'string' ? (
						<Typography component={headingComponent || 'h3'}>{heading}</Typography>
					) : (
						heading.map((item) => (
							<Typography component={headingComponent || 'h3'} key={item}>
								{item}
							</Typography>
						))
					)}
				</Block>
				<Block className={join(c.textContainer)} style={textContentStyle} ref={textContentRef}>
					{!text && children}
					{text &&
						Array.isArray(text) &&
						text.map((item) => (
							<Typography component={textComponent || 'p1'} key={item}>
								{item}
							</Typography>
						))}
					{text && typeof text === 'string' && (
						<Typography component={textComponent || 'p1'}>{text}</Typography>
					)}
				</Block>
			</li>
		);
	},
);

AccordionListItem.displayName = 'AccordionListItem';

import { forwardRef, useEffect, useState } from 'react';

import asm from 'asm-ts-scripts';

import { AccordionListItem } from './AccordionListItem';

import s from './AccordionList.module.scss';

export type AccordionListElement = HTMLUListElement;

export interface AccordionListProps extends ReactHTMLElementAttributes<AccordionListElement> {
	content: {
		heading: string | string[];
		text: string | string[];
	}[];
	headingComponent?: TypographyVariants;
	textComponent?: TypographyVariants;
	autoclose?: boolean;
	fullwidth?: boolean;
	iconSize?: ComponentSizes;
}

type ContentWithId = {
	id: number;
	isOpen: boolean;
	heading: string | string[];
	text: string | string[];
}[];

export const AccordionList = forwardRef<AccordionListElement, AccordionListProps>(({
	content,
	headingComponent,
	textComponent,
	autoclose,
	fullwidth,
	iconSize,
	className,
	...rest
}, ref) => {
	const [clicked, setClicked] = useState<number>(-1);
	const [contentWithId, setContentWithId] = useState<ContentWithId>();

	useEffect(() => {
		setContentWithId(content.map((item, i) => ({
			...item,
			id: i,
			isOpen: false,
		})));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [content]);

	const handleToggle = (id: number) => {
		if (autoclose && clicked === id) {
			return setClicked(-1);
		}
		if (!autoclose && contentWithId && id > -1) {
			return setContentWithId(
				contentWithId.map((item, i) => {
					if (id === i) {
						return { ...item, isOpen: !item.isOpen };
					}
					return item;
				}),
			);
		}
		return setClicked(id);
	};

	return (
		<ul
			className={asm.join(s.AccordionList, className)}
			ref={ref}
			{...rest}
		>
			{contentWithId && contentWithId.map((item) => (
				<AccordionListItem
					headingComponent={headingComponent}
					textComponent={textComponent}
					heading={item.heading}
					text={item.text}
					key={item.id}
					active={autoclose ? (clicked === item.id) : item.isOpen}
					fullwidth={fullwidth}
					iconSize={iconSize}
					onToggle={() => handleToggle(item.id)}
				/>
			))}
		</ul>
	);
});

AccordionList.displayName = 'AccordionList';

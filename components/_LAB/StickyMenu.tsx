import { forwardRef, useState } from 'react';

import asm from 'asm-ts-scripts';

import { Block } from '../blocks';
import { Button } from '../Button';
import { MoreVerticalIcon } from '../icons/MoreVerticalIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { Typography } from '../Typography';
import { ReactChildren } from './ReactChildren';
import type { StickyButtonProps } from './StickyButton';
import { StickyButton } from './StickyButton';

import s from './StickyMenu.module.scss';

type StickyMenuElement = HTMLDivElement;

export interface StickyMenuProps extends StickyButtonProps {
	animation?: 'popup' | 'slide-in';
	inverseDirection?: boolean;
	hideOnScreensCount?: number;
	offset?: number;
	menuItems: {
		title: string;
		action: () => void;
	}[];
}

export const StickyMenu = forwardRef<StickyMenuElement, StickyMenuProps>(({
	animation,
	inverseDirection,
	hideOnScreensCount,
	offset,
	menuItems,
	className,
	onClick,
	children,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	...rest
}, ref) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleButtonClick = () => {
		setIsOpen((state) => !state);
	};

	const componentClass = [
		isOpen && s.open,
	];

	const handleMenuItemOnClick = (action: () => void) => {
		action();
		setIsOpen(false);
	};

	return (

		<StickyButton
			className={asm.join(s.StickyMenu, className, componentClass)}
			animation={animation}
			inverseDirection={inverseDirection}
			hideOnScreensCount={hideOnScreensCount}
			offset={offset}
			onClick={onClick}
			ref={ref}
		>
			<Button onClick={handleButtonClick}>
				<Block className={s.iconBlock}>
					{children ? <ReactChildren className={s.mainIcon}>{children}</ReactChildren>
						: <MoreVerticalIcon className={s.mainIcon} />}
					<PlusIcon className={s.plusIcon} />
				</Block>
			</Button>
			<Block className={s.menu}>
				{menuItems.map((item, i) => (
					<Block
						className={s.menuItem}
						style={{
							'--sticky-menu-offset': `calc((100% * ${menuItems.length - (i + 1)}) + (8px * ${menuItems.length - (i + 1)}))`,
						} as React.CSSProperties}
						onClick={() => handleMenuItemOnClick(item.action)}
						key={item.title}
					>
						<Typography className={s.menuTitle}>{item.title}</Typography>
					</Block>
				))}
			</Block>
		</StickyButton>

	);
});

StickyMenu.displayName = 'StickyMenu';

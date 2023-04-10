import {
	forwardRef, useEffect, useRef, useState,
} from 'react';

import asm from 'asm-ts-scripts';

import { useScrollLock } from '../../hooks/useScrollLock';
import { Button } from '../Button';
import { XIcon } from '../icons/XIcon';

import s from './Menu.module.scss';

export type MenuElement = HTMLDivElement;

export interface MenuProps extends ReactHTMLElementAttributes<MenuElement> {
	children: React.ReactNode;
	isOpen: boolean;
	scrollLock?: boolean;
	onClick: () => void;
	closeButton?: boolean;
	preventItemClickClose?: boolean;
	menuOrigin?: {
		horizontal: 'left' | 'right';
		vertical: 'top' | 'bottom';
	};
	anchorOrigin?: {
		horizontal: 'left' | 'center' | 'right';
		vertical: 'top' | 'center' | 'bottom';
	};
}
export const Menu = forwardRef<MenuElement, MenuProps>(({
	children,
	isOpen,
	scrollLock,
	onClick,
	closeButton,
	preventItemClickClose,
	menuOrigin,
	anchorOrigin,
	...rest
}, ref) => {
	const menuRef = useRef<HTMLUListElement>(null);

	const [show, setShow] = useState(true);
	const [menuPositionStyle, setMenuPositionStyle] = useState<Record<string, number | string>>({});

	const { lockScroll, unlockScroll } = useScrollLock();

	useEffect(() => {
		if (isOpen && scrollLock) {
			lockScroll();
		}
		return unlockScroll;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	useEffect(() => {
		setShow(true);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		// TODO
		// const menuBoundingCalculated = menuRef.current?.getBoundingClientRect();
		const anchorBoundingCalculated = menuRef.current?.parentElement?.getBoundingClientRect();

		const anchor = {
			width: anchorBoundingCalculated?.width || 0,
			height: anchorBoundingCalculated?.height || 0,
			horizontalHalf: (anchorBoundingCalculated?.width || 0) / 2,
			verticalHalf: (anchorBoundingCalculated?.height || 0) / 2,
		};

		// TODO
		// const menu = {
		// 	horizontalHalf: (menuBoundingCalculated?.width || 0) / 2,
		// 	verticalHalf: (menuBoundingCalculated?.height || 0) / 2,
		// };

		const menuBoundingStyle: Record<string, number> = {};

		const anchorH = anchorOrigin?.horizontal;
		const anchorV = anchorOrigin?.vertical;
		const menuH = menuOrigin?.horizontal;
		const menuV = menuOrigin?.vertical;

		if (menuH === 'left') {
			if (anchorH === 'left') menuBoundingStyle.left = 0;
			if (anchorH === 'center') menuBoundingStyle.left = anchor.horizontalHalf;
			if (anchorH === 'right') menuBoundingStyle.left = anchor.width;
		}

		// TODO
		// if (menuH === 'center') {
		// 	if (anchorH === 'left') menuBoundingStyle.left = 0;
		// 	if (anchorH === 'center') menuBoundingStyle.left = 0;
		// 	if (anchorH === 'right') menuBoundingStyle.left = 0;
		// }

		if (menuH === 'right') {
			if (anchorH === 'left') menuBoundingStyle.right = anchor.width;
			if (anchorH === 'center') menuBoundingStyle.right = anchor.horizontalHalf;
			if (anchorH === 'right') menuBoundingStyle.right = 0;
		}

		if (menuV === 'top') {
			if (anchorV === 'top') menuBoundingStyle.top = 0;
			if (anchorV === 'center') menuBoundingStyle.top = anchor.verticalHalf;
			if (anchorV === 'bottom') menuBoundingStyle.top = anchor.height;
		}

		// TODO
		// if (menuV === 'center') {
		// 	if (anchorV === 'top') menuBoundingStyle.top = 0;
		// 	if (anchorV === 'center') menuBoundingStyle.top = 0;
		// 	if (anchorV === 'bottom') menuBoundingStyle.top = 0;
		// }

		if (menuV === 'bottom') {
			if (anchorV === 'top') menuBoundingStyle.bottom = anchor.height;
			if (anchorV === 'center') menuBoundingStyle.bottom = anchor.verticalHalf;
			if (anchorV === 'bottom') menuBoundingStyle.bottom = 0;
		}

		const menuOrigins = menuOrigin
			? `${menuOrigin?.horizontal} ${menuOrigin?.vertical}` : 'left top';

		setMenuPositionStyle({
			...menuBoundingStyle, transformOrigin: menuOrigins,
		});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	if (!isOpen) return null;

	const handleCloseMenu = () => {
		setShow(false);
	};

	const handleAnimationend = () => {
		if (!show) {
			onClick();
			unlockScroll();
		}
	};

	const handleMenuItemClick = (event: React.MouseEvent<HTMLUListElement>) => {
		if (preventItemClickClose) {
			event.stopPropagation();
		}
	};

	return (
		<>
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
			<div
				role="navigation"
				className={s.backdrop}
				onClick={handleCloseMenu}
				ref={ref}
				{...rest}
			/>
			<nav
				onAnimationEnd={handleAnimationend}
				ref={menuRef}
				className={asm.join(s.Menu, show && s.show)}
				style={menuPositionStyle}
			>

				{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
				<ul
					className={s.menuItems}
					onClick={handleMenuItemClick}
				>
					{children}
				</ul>
				{closeButton && (
					<Button className={s.close} onClick={handleCloseMenu} type="secondary" size="small">
						<XIcon size="small" />
					</Button>
				)}
			</nav>
		</>
	);
});

Menu.displayName = 'Menu';

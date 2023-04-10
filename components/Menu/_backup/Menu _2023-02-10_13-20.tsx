import {
	forwardRef, useEffect, useRef, useState,
} from 'react';

import asm from 'asm-ts-scripts';

import { useScrollLock } from '~/asmlib/hooks/useScrollLock';

import { Button } from '../Button/Button';
import { Portal } from '../Portal';
import { SvgIcon } from '../SvgIcon/SvgIcon';

import s from './Menu.module.scss';

type ComponentElementType = HTMLDivElement;

interface Menu extends ReactHTMLElementAttributes<ComponentElementType> {
	children: React.ReactNode;
	isOpen: boolean;
	onClick: () => void;
	closeButton?: boolean;
	preventItemClickClose?: boolean;
	anchorElement: HTMLElement | null;
	menuOrigin?: {
		horizontal: 'left' | 'center' | 'right';
		vertical: 'top' | 'center' | 'bottom';
	};
	anchorOrigin?: {
		horizontal: 'left' | 'center' | 'right';
		vertical: 'top' | 'center' | 'bottom';
	};
}
export const Menu = forwardRef<ComponentElementType, Menu>(({
	children,
	isOpen,
	onClick,
	closeButton,
	preventItemClickClose,
	anchorElement,
	menuOrigin,
	anchorOrigin,
	...rest
}: Menu, ref) => {
	const menuRef = useRef<HTMLUListElement>(null);

	const [show, setShow] = useState('show');
	const [menuPositionStyle, setMenuPositionStyle] = useState<Record<string, number | string>>({});

	const { lockScroll, unlockScroll } = useScrollLock();

	useEffect(() => {
		if (isOpen) {
			lockScroll();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	useEffect(() => {
		setShow('show');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	const bodyWidth = document.body.offsetWidth;
	const viewportHeight = window.innerHeight;
	const body = document.body.getBoundingClientRect();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		const anchor = anchorElement?.getBoundingClientRect();
		const menu = menuRef.current?.getBoundingClientRect();

		const anchorBoundingCalculated = {
			left: anchor?.left || 0,
			right: Math.abs(bodyWidth - (anchor?.right || 0)),
			top: anchor?.top || 0,
			bottom: Math.abs((viewportHeight || 0) - (anchor?.bottom || 0)),
			width: anchor?.width || 0,
			height: anchor?.height || 0,
			horizontalHalf: (anchor?.width || 0) / 2,
			verticalHalf: (anchor?.height || 0) / 2,
		};

		const menuBoundingCalculated = {
			horizontalHalf: (menu?.width || 0) / 2,
			verticalHalf: (menu?.height || 0) / 2,
		};

		const anchorH = anchorOrigin?.horizontal;
		const anchorV = anchorOrigin?.vertical;
		const menuH = menuOrigin?.horizontal;
		const menuV = menuOrigin?.vertical;

		let horizontalLeft;
		let horizontalRight;
		let verticalBottom;
		let verticalTop;

		if (menuH === 'left') {
			if (anchorH === 'left') horizontalLeft = anchorBoundingCalculated.left;
			if (anchorH === 'center') horizontalLeft = anchorBoundingCalculated.left + anchorBoundingCalculated.horizontalHalf;
			if (anchorH === 'right') horizontalLeft = anchorBoundingCalculated.left + anchorBoundingCalculated.width;
		}

		if (menuH === 'center') {
			if (anchorH === 'left') horizontalLeft = anchorBoundingCalculated.left - (menuBoundingCalculated.horizontalHalf + anchorBoundingCalculated.horizontalHalf); // TODO: TEST
			if (anchorH === 'center') horizontalLeft = anchorBoundingCalculated.left - menuBoundingCalculated.horizontalHalf;
			if (anchorH === 'right') horizontalLeft = anchorBoundingCalculated.left - (menuBoundingCalculated.horizontalHalf - anchorBoundingCalculated.horizontalHalf); // TODO: TEST
		}

		if (menuH === 'right') {
			if (anchorH === 'left') horizontalRight = anchorBoundingCalculated.right - anchorBoundingCalculated.width;
			if (anchorH === 'center') horizontalRight = anchorBoundingCalculated.right + anchorBoundingCalculated.horizontalHalf;
			if (anchorH === 'right') horizontalRight = anchorBoundingCalculated.right;
		}

		if (menuV === 'top') {
			if (anchorV === 'top') verticalTop = anchorBoundingCalculated.top;
			if (anchorV === 'center') verticalTop = anchorBoundingCalculated.top + anchorBoundingCalculated.verticalHalf;
			if (anchorV === 'bottom') verticalTop = anchorBoundingCalculated.top + anchorBoundingCalculated.height;
		}

		if (menuV === 'center') {
			if (anchorV === 'top') verticalTop = anchorBoundingCalculated.top - (menuBoundingCalculated.verticalHalf + anchorBoundingCalculated.verticalHalf);
			if (anchorV === 'center') verticalTop = anchorBoundingCalculated.top - menuBoundingCalculated.verticalHalf;
			if (anchorV === 'bottom') verticalTop = anchorBoundingCalculated.top - (menuBoundingCalculated.verticalHalf - anchorBoundingCalculated.verticalHalf);
		}

		if (menuV === 'bottom') {
			if (anchorV === 'top') verticalBottom = anchorBoundingCalculated.bottom + anchorBoundingCalculated.height;
			if (anchorV === 'center') verticalBottom = anchorBoundingCalculated.bottom + anchorBoundingCalculated.verticalHalf;
			if (anchorV === 'bottom') verticalBottom = anchorBoundingCalculated.bottom;
		}

		const menuBoundingStyle: Record<string, number> = {};
		if (horizontalLeft) menuBoundingStyle.left = horizontalLeft;
		if (horizontalRight) menuBoundingStyle.right = horizontalRight;
		if (verticalTop) menuBoundingStyle.top = verticalTop;
		if (verticalBottom) menuBoundingStyle.bottom = verticalBottom;

		const menuOrigins = menuOrigin
			? `${menuOrigin?.horizontal} ${menuOrigin?.vertical}` : 'left top';

		setMenuPositionStyle({
			...menuBoundingStyle, transformOrigin: menuOrigins,
		});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, bodyWidth, viewportHeight]);

	if (!isOpen) return null;

	const handleCloseMenu = () => {
		setShow('');
	};

	const handleAnimationend = () => {
		if (show !== 'show') {
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
		<Portal>
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
			<div
				role="navigation"
				className={asm.join(s.Menu, show)}
				onClick={handleCloseMenu}
				ref={ref}
				{...rest}
			>
				{/* <p className="h6">{JSON.stringify(menuPositionStyle)}</p> */}
				<p className="p1">{JSON.stringify(body)}</p>
				{/* <p className="h6">{JSON.stringify(viewportHeight)}</p> */}
				{/* <p className="h6">{JSON.stringify(w)}</p>
				<p className="h6">{JSON.stringify(h)}</p> */}
				{/* <p className="h1">{viewportHeight}</p> */}
				<nav
					onAnimationEnd={handleAnimationend}
					ref={menuRef}
					// className={s.menuItems}
					className={s.menuContainer}
					style={menuPositionStyle}
				>

					{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
					<ul
						// onAnimationEnd={handleAnimationend}
						// ref={menuRef}
						// style={menuPositionStyle}
						className={s.menuItems}
						onClick={handleMenuItemClick}
					>
						{children}
					</ul>
					{closeButton && (
						<Button className={s.close} onClick={handleCloseMenu} type="secondary" size="small">
							<SvgIcon size="small" icon="icon--x" />
						</Button>
					)}
				</nav>
			</div>
		</Portal>
	);
});

Menu.displayName = 'Menu';

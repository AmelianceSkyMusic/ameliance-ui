import { forwardRef, useEffect, useRef, useState } from 'react';

import { useScrollLock } from '~/asmlib/hooks/use-scroll-lock';

import { Portal } from '../portal';

import c from './menu.module.scss';

type ComponentElementType = HTMLAnchorElement;

interface Menu
   extends ReactHTMLElementAttributes<
      ComponentElementType,
      React.AnchorHTMLAttributes<ComponentElementType>
   > {
   children: React.ReactNode;
   isOpen: boolean;
   onClick: () => void;
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
export const Menu = forwardRef<ComponentElementType, Menu>(
   (
      {
         children,
         isOpen,
         onClick,
         preventItemClickClose,
         anchorElement,
         menuOrigin,
         anchorOrigin,
         ...rest
      }: Menu,
      ref,
   ) => {
      const menuRef = useRef<HTMLUListElement>(null);

      const [show, setShow] = useState('show');
      const [menuPositionStyle, setMenuPositionStyle] = useState<Record<string, number | string>>(
         {},
      );

      // const { lockScroll, unlockScroll } = useScrollLock();

      useEffect(() => {
         setShow('show');
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isOpen]);

      // useEffect(() => {
      // 	if (isOpen) {
      // 		lockScroll();
      // 	}
      // // eslint-disable-next-line react-hooks/exhaustive-deps
      // }, [isOpen]);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => {
         const rect = anchorElement?.getBoundingClientRect();
         const menu = menuRef.current?.getBoundingClientRect();
         const body = document.body.getBoundingClientRect();

         const anchorBoundingCalculated = {
            left: rect?.left || 0,
            right: Math.abs(body.right - (rect?.right || 0)),
            top: rect?.top || 0,
            bottom: Math.abs(body.bottom - (rect?.bottom || 0)),
            width: rect?.width || 0,
            height: rect?.height || 0,
            horizontalHalf: (rect?.width || 0) / 2,
            verticalHalf: (rect?.height || 0) / 2,
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
            if (anchorH === 'center')
               horizontalLeft =
                  anchorBoundingCalculated.left + anchorBoundingCalculated.horizontalHalf;
            if (anchorH === 'right')
               horizontalLeft = anchorBoundingCalculated.left + anchorBoundingCalculated.width;
         }

         if (menuH === 'center') {
            if (anchorH === 'left')
               horizontalLeft =
                  anchorBoundingCalculated.left -
                  (menuBoundingCalculated.horizontalHalf + anchorBoundingCalculated.horizontalHalf); // TODO: TEST
            if (anchorH === 'center')
               horizontalLeft =
                  anchorBoundingCalculated.left - menuBoundingCalculated.horizontalHalf;
            if (anchorH === 'right')
               horizontalLeft =
                  anchorBoundingCalculated.left -
                  (menuBoundingCalculated.horizontalHalf - anchorBoundingCalculated.horizontalHalf); // TODO: TEST
         }

         if (menuH === 'right') {
            if (anchorH === 'left')
               horizontalRight = anchorBoundingCalculated.right - anchorBoundingCalculated.width;
            if (anchorH === 'center')
               horizontalRight =
                  anchorBoundingCalculated.right + anchorBoundingCalculated.horizontalHalf;
            if (anchorH === 'right') horizontalRight = anchorBoundingCalculated.right;
         }

         if (menuV === 'top') {
            if (anchorV === 'top') verticalTop = anchorBoundingCalculated.top;
            if (anchorV === 'center')
               verticalTop = anchorBoundingCalculated.top + anchorBoundingCalculated.verticalHalf;
            if (anchorV === 'bottom')
               verticalTop = anchorBoundingCalculated.top + anchorBoundingCalculated.height;
         }

         if (menuV === 'center') {
            if (anchorV === 'top')
               verticalTop =
                  anchorBoundingCalculated.top -
                  (menuBoundingCalculated.verticalHalf + anchorBoundingCalculated.verticalHalf);
            if (anchorV === 'center')
               verticalTop = anchorBoundingCalculated.top - menuBoundingCalculated.verticalHalf;
            if (anchorV === 'bottom')
               verticalTop =
                  anchorBoundingCalculated.top -
                  (menuBoundingCalculated.verticalHalf - anchorBoundingCalculated.verticalHalf);
         }

         if (menuV === 'bottom') {
            if (anchorV === 'top')
               verticalBottom = anchorBoundingCalculated.bottom + anchorBoundingCalculated.height;
            if (anchorV === 'center')
               verticalBottom =
                  anchorBoundingCalculated.bottom + anchorBoundingCalculated.verticalHalf;
            if (anchorV === 'bottom') verticalBottom = anchorBoundingCalculated.bottom;
         }

         const menuBoundingStyle: Record<string, number> = {};
         if (horizontalLeft) menuBoundingStyle.left = horizontalLeft;
         if (horizontalRight) menuBoundingStyle.right = horizontalRight;
         if (verticalTop) menuBoundingStyle.top = verticalTop;
         if (verticalBottom) menuBoundingStyle.bottom = verticalBottom;

         const menuOrigins = menuOrigin
            ? `${menuOrigin?.horizontal} ${menuOrigin?.vertical}`
            : 'left top';

         setMenuPositionStyle({
            ...menuBoundingStyle,
            transformOrigin: menuOrigins,
         });

         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isOpen]);

      if (!isOpen) return null;

      const handleCloseMenu = () => {
         setShow('');
      };

      const handleAnimationend = () => {
         if (show !== 'show') {
            onClick();
            // unlockScroll();
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
            <nav
               className={asm.join(c.Menu, show)}
               onClick={handleCloseMenu}
               onScroll={() => {
                  console.log('radzhab@ukr.net:');
               }}
               ref={ref}
               {...rest}
            >
               {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
               <ul
                  onAnimationEnd={handleAnimationend}
                  ref={menuRef}
                  className={c.menuItems}
                  style={menuPositionStyle}
                  onClick={handleMenuItemClick}
               >
                  {children}
               </ul>
            </nav>
         </Portal>
      );
   },
);

Menu.displayName = 'Menu';

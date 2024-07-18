import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { join } from 'ameliance-scripts/scripts/join';

import { Button } from '../button/button';
import { Portal } from '../portal';
import { SvgIcon } from '../svg-icon/svg-icon';

import c from './menu.module.scss';

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
export const Menu = forwardRef<ComponentElementType, Menu>(
   (
      {
         children,
         isOpen,
         onClick,
         closeButton,
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

      useEffect(() => {
         setShow('show');
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isOpen]);

      const { viewportHeight } = useViewportHeight();
      const menuRectWidth = menuRef.current?.offsetWidth;
      const menuRectHeight = menuRef.current?.offsetHeight;

      // eslint-disable-next-line react-hooks/exhaustive-deps
      useLayoutEffect(() => {
         const anchorRect = anchorElement?.getBoundingClientRect();
         console.table('--------------');
         console.table(anchorRect);
         console.table({ menuRectWidth, menuRectHeight });
         // console.table(menuRect);

         const anchor = {
            left: anchorRect?.left || 0,
            right: anchorRect?.right || 0,
            top: anchorRect?.top || 0,
            bottom: anchorRect?.bottom || 0,
            width: anchorRect?.width || 0,
            height: anchorRect?.height || 0,
            horizontalHalf: (anchorRect?.width || 0) / 2,
            verticalHalf: (anchorRect?.height || 0) / 2,
         };

         const menu = {
            width: menuRectWidth || 0,
            height: menuRectHeight || 0,
            horizontalHalf: (menuRectWidth || 0) / 2,
            verticalHalf: (menuRectHeight || 0) / 2,
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
            if (anchorH === 'left') horizontalLeft = anchor.left;
            if (anchorH === 'center') horizontalLeft = anchor.left + anchor.horizontalHalf;
            if (anchorH === 'right') horizontalLeft = anchor.left + anchor.width;
         }

         if (menuH === 'center') {
            if (anchorH === 'left')
               horizontalLeft = anchor.left - (menu.horizontalHalf + anchor.horizontalHalf);
            if (anchorH === 'center') horizontalLeft = anchor.left - menu.horizontalHalf;
            if (anchorH === 'right')
               horizontalLeft = anchor.left - (menu.horizontalHalf - anchor.horizontalHalf);
         }

         if (menuH === 'right') {
            if (anchorH === 'left') horizontalRight = anchor.right - anchor.width;
            if (anchorH === 'center') horizontalRight = anchor.right + anchor.horizontalHalf;
            if (anchorH === 'right') horizontalLeft = anchor.right - 131;
            console.log('horizontalLeft: ', horizontalLeft);
         }

         if (menuV === 'top') {
            if (anchorV === 'top') verticalTop = anchor.top;
            if (anchorV === 'center') verticalTop = anchor.top + anchor.verticalHalf;
            if (anchorV === 'bottom') verticalTop = anchor.top + anchor.height;
         }

         if (menuV === 'center') {
            if (anchorV === 'top')
               verticalTop = anchor.top - (menu.verticalHalf + anchor.verticalHalf);
            if (anchorV === 'center') verticalTop = anchor.top - menu.verticalHalf;
            if (anchorV === 'bottom')
               verticalTop = anchor.top - (menu.verticalHalf - anchor.verticalHalf);
         }

         if (menuV === 'bottom') {
            if (anchorV === 'top') verticalBottom = anchor.bottom + anchor.height;
            if (anchorV === 'center') verticalBottom = anchor.bottom + anchor.verticalHalf;
            if (anchorV === 'bottom') verticalBottom = anchor.bottom;
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
      }, [isOpen, menuRectWidth, menuRectHeight]);

      if (!isOpen) return null;

      const handleCloseMenu = () => {
         setShow('');
      };

      const handleAnimationend = () => {
         if (show !== 'show') {
            onClick();
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
               className={join(c.Menu, show)}
               onClick={handleCloseMenu}
               ref={ref}
               {...rest}
            >
               <p className="p1">{viewportHeight}</p>
               <nav
                  onAnimationEnd={handleAnimationend}
                  ref={menuRef}
                  // className={c.menuItems}
                  className={c.menuContainer}
                  style={menuPositionStyle}
               >
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                  <ul
                     // onAnimationEnd={handleAnimationend}
                     // ref={menuRef}
                     // style={menuPositionStyle}
                     className={c.menuItems}
                     onClick={handleMenuItemClick}
                  >
                     {children}
                  </ul>
                  {closeButton && (
                     <Button
                        className={c.close}
                        onClick={handleCloseMenu}
                        type="secondary"
                        size="small"
                     >
                        <SvgIcon size="small" icon="icon--x" />
                     </Button>
                  )}
               </nav>
            </div>
         </Portal>
      );
   },
);

Menu.displayName = 'Menu';

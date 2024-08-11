import { forwardRef, useState } from 'react';

import { Block } from '../blocks';
import { Button } from '../button';
import { MoreVerticalIcon } from '../icons/more-vertical-icon';
import { PlusIcon } from '../icons/plus-icon';
import { Typography } from '../typography';
import { ReactChildren } from './react-children';
import type { StickyButtonProps } from './sticky-button';
import { StickyButton } from './sticky-button';

import c from './sticky-menu.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type StickyMenuElement = HTMLDivElement;

export interface StickyMenuProps extends Omit<StickyButtonProps, 'ref'> {
   animation?: 'popup' | 'slide-in';
   inverseDirection?: boolean;
   hideOnScreensCount?: number;
   offset?: number | null;
   menuItems: {
      title: string;
      action: () => void;
   }[];
}

export const StickyMenu = forwardRef<StickyMenuElement, StickyMenuProps>(
   (
      {
         animation,
         inverseDirection,
         hideOnScreensCount,
         offset,
         menuItems,
         className,
         onClick,
         children,
         ...rest
      },
      ref,
   ) => {
      const [isOpen, setIsOpen] = useState(false);

      const handleButtonClick = () => {
         setIsOpen((state) => !state);
      };

      const componentClass = [isOpen && c.open];

      const handleMenuItemOnClick = (action: () => void) => {
         action();
         setIsOpen(false);
      };

      return (
         <StickyButton
            className={join(className, componentClass)}
            animation={animation}
            inverseDirection={inverseDirection}
            hideOnScreensCount={hideOnScreensCount}
            offset={offset}
            onClick={onClick}
            ref={ref}
            {...rest}
         >
            <Button onClick={handleButtonClick}>
               <Block className={c.iconBlock}>
                  {children ? (
                     <ReactChildren className={c.mainIcon}>{children}</ReactChildren>
                  ) : (
                     <MoreVerticalIcon className={c.mainIcon} />
                  )}
                  <PlusIcon className={c.plusIcon} />
               </Block>
            </Button>
            <Block className={c.menu}>
               {menuItems.map((item, i) => (
                  <Block
                     className={c.menuItem}
                     style={
                        {
                           '--sticky-menu-offset': `calc((100% * ${
                              menuItems.length - (i + 1)
                           }) + (8px * ${menuItems.length - (i + 1)}))`,
                        } as React.CSSProperties
                     }
                     onClick={() => handleMenuItemOnClick(item.action)}
                     key={item.title}
                  >
                     <Typography className={c.menuTitle}>{item.title}</Typography>
                  </Block>
               ))}
            </Block>
         </StickyButton>
      );
   },
);

StickyMenu.displayName = 'StickyMenu';

import { forwardRef, useEffect, useState } from 'react';

import { AccordionListItem } from './accordion-list-item';

import c from './accordion-list.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type AccordionListElement = HTMLUListElement;

export type AccordionListProps = React.ComponentPropsWithoutRef<'ul'> & {
   contentList: {
      heading: string | string[];
      text: string | string[];
   }[];
   headingComponent?: TypographyVariants;
   textComponent?: TypographyVariants;
   autoclose?: boolean;
   fullwidth?: boolean;
   iconSize?: ComponentSizes;
};

type ContentWithId = {
   id: number;
   isOpen: boolean;
   heading: string | string[];
   text: string | string[];
}[];

export const AccordionList = forwardRef<AccordionListElement, AccordionListProps>(
   (
      {
         contentList,
         headingComponent,
         textComponent,
         autoclose,
         fullwidth,
         iconSize,
         className,
         ...rest
      },
      ref,
   ) => {
      const [clicked, setClicked] = useState<number>(-1);
      const [contentWithId, setContentWithId] = useState<ContentWithId>();

      useEffect(() => {
         setContentWithId(
            contentList.map((item, i) => ({
               ...item,
               id: i,
               isOpen: false,
            })),
         );
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [contentList]);

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
         <ul className={join(c.root, className)} ref={ref} {...rest}>
            {contentWithId &&
               contentWithId.map((item) => (
                  <AccordionListItem
                     headingComponent={headingComponent}
                     textComponent={textComponent}
                     heading={item.heading}
                     text={item.text}
                     key={item.id}
                     active={autoclose ? clicked === item.id : item.isOpen}
                     fullwidth={fullwidth}
                     iconSize={iconSize}
                     onToggle={() => handleToggle(item.id)}
                  />
               ))}
         </ul>
      );
   },
);

AccordionList.displayName = 'AccordionList';

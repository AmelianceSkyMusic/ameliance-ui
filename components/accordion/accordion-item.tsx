import { forwardRef, useRef } from 'react';

import { Block } from '../blocks/block';
import { ChevronDownIcon } from '../icons/chevron-down-icon';
import { Typography } from '../typography';

import c from './accordion-list.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type AccordionItemElement = HTMLDivElement;

export type AccordionItemProps = React.ComponentPropsWithoutRef<'div'> & {
   heading: string | string[];
   text?: string | string[];
   headingComponent?: TypographyVariants;
   textComponent?: TypographyVariants;
   active: boolean;
   fullwidth?: boolean;
   iconSize?: ComponentSizes;
   onToggle: () => void;
   disabled?: boolean;
};

export const AccordionItem = forwardRef<AccordionItemElement, AccordionItemProps>(
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
         <div className={join(c.root, className, componentClass)} ref={ref} {...rest}>
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
         </div>
      );
   },
);

AccordionItem.displayName = 'AccordionItem';

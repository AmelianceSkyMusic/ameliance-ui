import { useEffect, useState } from 'react';

import { useScrollLock } from '~hooks/use-scroll-lock';

import { Backdrop } from './backdrop';
import { Button } from './inputs/button';
import c from './modal.module.scss';
import { Portal } from './portal';

interface Button {
   text?: string;
   onClick?: () => void;
   icon?: string;
   iconPosition?: 'left' | 'right';
   disabled?: boolean;
   buttonIcon?: boolean;
   size?: 'normal' | 'small';
   isSubmit?: boolean;
   type?: 'primary' | 'secondary';
   form?: string;
}

interface ModalProps {
   type?: 'alert' | 'info' | 'success' | 'error' | 'warn';
   title?: string;
   noTitle?: boolean;
   children: React.ReactElement;
   className?: string;
   mainButton?: Button;
   secondButton?: Button;
   backdrop?: {
      onClick?: { (): void } | null;
      disabled?: boolean;
   };
   onClose?: () => void;
   isButtons?: boolean;
   size?: 'flex' | 'medium' | 'large';
}

export function Modal({
   type,
   title,
   children,
   noTitle,
   className,
   mainButton,
   secondButton,
   backdrop,
   onClose,
   isButtons = true,
   size = 'flex',
}: ModalProps) {
   const [show, setShow] = useState('show');

   const isSecondButton = secondButton && !asm.isObjectEmpty(secondButton);

   const closeModal = () => {
      setShow('');
   };

   const handleAnimationend = () => {
      if (show !== 'show') {
         closeModal();
         document.body.style.overflow = 'visible';
         if (onClose) onClose();
      }
   };

   const backdropClickHandler = () => {
      if (backdrop?.onClick) backdrop.onClick();
      closeModal();
   };

   const mainButtonHandler = () => {
      if (mainButton?.onClick) mainButton.onClick();
      if (!mainButton?.form) closeModal();
   };

   const secondButtonHandler = () => {
      if (secondButton?.onClick) secondButton.onClick();
      if (!secondButton?.form) closeModal();
   };

   const typeClass =
      null ||
      (type === 'alert' && c.alert) ||
      (type === 'info' && c.info) ||
      (type === 'success' && c.success) ||
      (type === 'error' && c.error) ||
      (type === 'warn' && c.warn);

   const modalTitle =
      title ||
      (type === 'alert' && 'Повідомлення!') ||
      (type === 'info' && 'Інформація!') ||
      (type === 'success' && 'Успіх!') ||
      (type === 'error' && 'Помилка') ||
      (type === 'warn' && 'Попередження!');

   useEffect(() => {
      document.body.style.overflow = 'hidden';
   }, []);

   const sizeClass = (size === 'medium' && c.medium) || (size === 'large' && c.large);

   return (
      <Portal>
         <div className={asm.join(c.Modal, className, show)} onAnimationEnd={handleAnimationend}>
            <Backdrop onClick={backdropClickHandler} disabled={backdrop?.disabled} />
            <div className={asm.join(sizeClass, c.content)}>
               <div className={type && asm.join(c.title, typeClass, type)}>
                  <h4 className={asm.join('h4')}>{!noTitle && modalTitle}</h4>
               </div>
               <div className={c.body}>{children}</div>
               {isButtons && (
                  <div className={c.buttons}>
                     {isSecondButton && (
                        <Button
                           size={secondButton?.size}
                           icon={secondButton?.icon}
                           iconPosition={secondButton?.iconPosition}
                           type={secondButton?.type || 'secondary'}
                           onClick={() => secondButtonHandler()}
                           buttonIcon={secondButton?.buttonIcon}
                           form={secondButton?.form}
                           isSubmit={secondButton?.isSubmit}
                           disabled={secondButton?.disabled}
                        >
                           {secondButton?.text || 'Відміна'}
                        </Button>
                     )}
                     <Button
                        size={mainButton?.size}
                        type={mainButton?.type || 'primary'}
                        icon={mainButton?.icon}
                        iconPosition={mainButton?.iconPosition}
                        onClick={() => mainButtonHandler()}
                        buttonIcon={mainButton?.buttonIcon}
                        form={mainButton?.form}
                        isSubmit={mainButton?.isSubmit}
                        disabled={mainButton?.disabled}
                     >
                        {mainButton?.text || 'Ок'}
                     </Button>
                  </div>
               )}
            </div>
         </div>
      </Portal>
   );
}

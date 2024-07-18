import { forwardRef, useEffect, useState } from 'react';

import { Icon } from '../Icon';
import { AlertCircleIcon } from '../icons/AlertCircleIcon';
import { AlertTriangleIcon } from '../icons/AlertTriangleIcon';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { InfoIcon } from '../icons/InfoIcon';
import { XCircleIcon } from '../icons/XCircleIcon';
import { XIcon } from '../icons/XIcon';
import { LoaderCounter } from '../Loader/LoaderCounter';
import { Typography } from '../Typography';

import c from './toast.module.scss';

type ElementType = HTMLDivElement;
type ElementProps = React.DetailedHTMLProps<React.HTMLAttributes<ElementType>, ElementType>;

interface ToastProps extends ElementProps {
   id: string;
   message: string;
   title?: string;
   noTitle?: boolean;
   type?: NotificationTypes;
   size?: 'flex' | 'medium' | 'large';
   position?:
      | 'bottom-center'
      | 'top-center'
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right';
   oneLine?: boolean;
   onCloseButtonClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
   autoDeleteTime?: number;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
   (
      {
         id,
         message,
         title,
         noTitle,
         type,
         size = 'flex',
         position = 'bottom-center',
         oneLine,
         onCloseButtonClick,
         autoDeleteTime = 0,
         className,
         ...rest
      },
      ref,
   ) => {
      const [isShow, setIsShow] = useState(false);

      const sizeClass = (size === 'medium' && c.medium) || (size === 'large' && c.large);

      const typeClass =
         null ||
         (type === 'alert' && c.alert) ||
         (type === 'info' && c.info) ||
         (type === 'success' && c.success) ||
         (type === 'error' && c.error) ||
         (type === 'warn' && c.warn);

      const toastTitle =
         title ||
         (type === 'alert' && 'Повідомлення!') ||
         (type === 'info' && 'Інформація!') ||
         (type === 'success' && 'Успіх!') ||
         (type === 'error' && 'Помилка') ||
         (type === 'warn' && 'Попередження!');

      const getIconByType = (iconType?: NotificationTypes) => {
         if (iconType === 'alert') return <AlertCircleIcon />;
         if (iconType === 'info') return <InfoIcon />;
         if (iconType === 'success') return <CheckCircleIcon />;
         if (iconType === 'error') return <XCircleIcon />;
         if (iconType === 'warn') return <AlertTriangleIcon />;
         return <AlertCircleIcon />;
      };

      const toastPositionClass =
         (position === 'bottom-center' && c.bottomCenter) ||
         (position === 'top-center' && c.topCenter) ||
         (position === 'top-left' && c.topLeft) ||
         (position === 'top-right' && c.topRight) ||
         (position === 'bottom-left' && c.bottomLeft) ||
         (position === 'bottom-right' && c.bottomRight);

      useEffect(() => {
         setIsShow(true);
      }, [toastPositionClass]);

      return (
         <div
            className={asm.join(
               c.Toast,
               isShow && toastPositionClass,
               sizeClass,
               typeClass,
               className,
            )}
            ref={ref}
            {...rest}
            data-id={id}
         >
            <div className={c.content}>
               <Icon>{getIconByType(type)}</Icon>
               <div className={asm.join(c.textContent, oneLine && c.oneLine)}>
                  <Typography component="h6" className={c.title}>
                     {!noTitle && toastTitle}
                  </Typography>
                  <Typography component="p1" className={c.message}>
                     {message}
                  </Typography>
               </div>
               <LoaderCounter timer={autoDeleteTime} />
            </div>
            <Icon size="small" onClick={onCloseButtonClick}>
               <XIcon size="small" />
            </Icon>
         </div>
      );
   },
);

Toast.displayName = 'Toast';

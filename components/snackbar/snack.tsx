import { forwardRef, useEffect, useRef } from 'react';

import { mergeRefs } from '../../helpers/merge-refs';
import { useSwipe } from '../../hooks/use-swipe';

import type { IconElement } from '../icon';
import { Icon } from '../icon';
import { AlertCircleIcon } from '../icons/alert-circle-icon';
import { AlertTriangleIcon } from '../icons/alert-triangle-icon';
import { CheckCircleIcon } from '../icons/check-circle-icon';
import { InfoIcon } from '../icons/info-icon';
import { XCircleIcon } from '../icons/x-circle-icon';
import { XIcon } from '../icons/x-icon';
import { LoaderCounter } from '../loader';
import { Typography } from '../typography';
import { useSnack } from './use-snack';

import c from './snack.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

type SnackElement = HTMLDivElement;

type SnackPosition =
   | 'bottom-center'
   | 'top-center'
   | 'top-left'
   | 'top-right'
   | 'bottom-left'
   | 'bottom-right';

export type SnackProps = React.ComponentPropsWithoutRef<'div'> & {
   id: string;
   message: string | string[];
   title?: string;
   type?: NotificationTypes;
   size?: 'flex' | 'medium' | 'large';
   position?: SnackPosition;
   oneLine?: boolean;
   onCloseButtonClick?: (event: React.MouseEvent<IconElement>) => void;
   duration?: number;
};

function getIconByType(iconType?: NotificationTypes) {
   if (iconType === 'alert') return <AlertCircleIcon />;
   if (iconType === 'info') return <InfoIcon />;
   if (iconType === 'success') return <CheckCircleIcon />;
   if (iconType === 'error') return <XCircleIcon />;
   if (iconType === 'warn') return <AlertTriangleIcon />;
   return <AlertCircleIcon />;
}

export const Snack = forwardRef<SnackElement, SnackProps>(
   (
      {
         id,
         message,
         title = '',
         type,
         size = 'flex',
         position = 'topRight',
         oneLine,
         onCloseButtonClick,
         duration = 3000,
         // children,
         className,
         ...rest
      },
      ref,
   ) => {
      const snackRef = useRef<HTMLDivElement>(null);
      const { remove } = useSnack();

      const componentClass = [size && c[size], type && c[type], position && c[position]];

      const contentViewClass = oneLine && c.oneLine;

      const snackTitle =
         title ||
         (type === 'alert' && 'Повідомлення!') ||
         (type === 'info' && 'Інформація!') ||
         (type === 'success' && 'Успіх!') ||
         (type === 'error' && 'Помилка!') ||
         (type === 'warn' && 'Попередження!');

      const closeSnack = () => {
         snackRef.current?.classList.add(c.hideSnackAnimation);
         snackRef.current?.addEventListener('animationend', (event) => {
            if (event.target === snackRef.current) {
               event.stopPropagation();
               remove(id);
            }
         });
      };

      // *----- auto dismiss -----
      const dismissRef = useRef<ReturnType<typeof setTimeout>>();
      useEffect(() => {
         if (duration > 0) {
            dismissRef.current = setTimeout(() => {
               closeSnack();
            }, duration);
         }
         return () => {
            clearTimeout(dismissRef.current);
         };
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      // // *----- progressbar -----
      // const progressRef = useRef<ReturnType<typeof setInterval>>();
      // const [progress, setProgress] = useState(autoDeleteTime);
      // useEffect(() => {
      // 	const complete = 100;
      // 	if (autoDeleteTime > 0) {
      // 		progressRef.current = setInterval(() => {
      // 			if (progress < complete) {
      // 				setProgress((prev) => prev + 1);
      // 			}
      // 		}, autoDeleteTime / complete);
      // 	}
      // 	return () => {
      // 		clearInterval(progressRef.current);
      // 	};
      // // eslint-disable-next-line react-hooks/exhaustive-deps
      // }, []);

      const { swipeDirection } = useSwipe({ ref: snackRef, targetDirection: 'right' });

      useEffect(() => {
         if (swipeDirection === 'right') closeSnack();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [swipeDirection]);

      const handleCloseButtonClick = (event: React.MouseEvent<IconElement>) => {
         if (onCloseButtonClick) onCloseButtonClick(event);
         closeSnack();
      };

      return (
         <div
            className={join(c.root, className, componentClass)}
            ref={mergeRefs([ref, snackRef])}
            {...rest}
         >
            <div className={c.content}>
               <Icon>{getIconByType(type)}</Icon>
               <div className={join(c.textContent, contentViewClass)}>
                  <Typography component="h6" className={c.title}>
                     {snackTitle}
                  </Typography>
                  {typeof message === 'string' ? (
                     <Typography component="p1" className={c.message}>
                        {message}
                     </Typography>
                  ) : (
                     message.map((text) => (
                        <Typography key={text} component="p1" className={c.message}>
                           {text}
                        </Typography>
                     ))
                  )}
               </div>
               {duration > 0 && <LoaderCounter timer={duration} />}
            </div>
            <Icon size="small" onClick={handleCloseButtonClick}>
               <XIcon size="small" />
            </Icon>
         </div>
      );
   },
);

Snack.displayName = 'Snack';

import { forwardRef, useEffect, useRef } from 'react';

import { join } from 'ameliance-scripts';

import { mergeRefs } from '../../helpers/merge-refs';
import { useSwipe } from '../../hooks/use-swipe';
import { Button } from '../button';
import type { IconElement } from '../icon';
import { Icon } from '../icon';
import { AlertCircleIcon } from '../icons/svg/alert-circle';
import { AlertTriangleIcon } from '../icons/svg/alert-triangle';
import { CheckCircleIcon } from '../icons/svg/check-circle';
import { InfoIcon } from '../icons/svg/info';
import { XIcon } from '../icons/svg/x';
import { XCircleIcon } from '../icons/svg/x-circle';
import { LoaderCounter } from '../loader';
import type { NotificationTypes } from '../types/notification-types';
import { Typography } from '../typography';
import { useSnack } from './use-snack';

import c from './snack.module.scss';

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
	if (iconType === 'alert') return <AlertCircleIcon className={c.icon} />;
	if (iconType === 'info') return <InfoIcon className={c.icon} />;
	if (iconType === 'success') return <CheckCircleIcon className={c.icon} />;
	if (iconType === 'error') return <XCircleIcon className={c.icon} />;
	if (iconType === 'warn') return <AlertTriangleIcon className={c.icon} />;
	return <AlertCircleIcon className={c.icon} />;
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
							<pre>
								<Typography component="p2" className={c.message}>
									{message}
								</Typography>
							</pre>
						) : (
							message.map((text) => (
								<pre key={text}>
									<Typography component="p2" className={c.message}>
										{text}
									</Typography>
								</pre>
							))
						)}
					</div>
					{duration > 0 && <LoaderCounter timer={duration} />}
				</div>
				<Button size="tiny" type="text" onClick={handleCloseButtonClick}>
					<XIcon size="sm" />
				</Button>
			</div>
		);
	},
);

Snack.displayName = 'Snack';

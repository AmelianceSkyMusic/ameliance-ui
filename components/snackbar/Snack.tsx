import type React from 'react';
import {
	forwardRef, useEffect, useRef,
} from 'react';

import asm from 'asm-ts-scripts';

import { mergeRefs } from '~/ameliance-ui/helpers/mergeRefs';
import { useSwipe } from '~/ameliance-ui/hooks/useSwipe';

import type { IconElement } from '../Icon';
import { Icon } from '../Icon';
import { AlertCircleIcon } from '../icons/AlertCircleIcon';
import { AlertTriangleIcon } from '../icons/AlertTriangleIcon';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { InfoIcon } from '../icons/InfoIcon';
import { XCircleIcon } from '../icons/XCircleIcon';
import { XIcon } from '../icons/XIcon';
import { LoaderCounter } from '../Loader';
import { Typography } from '../Typography';
import { useSnack } from './snackbar';

import s from './Snack.module.scss';

type SnackElement = HTMLDivElement;

type SnackPosition = 'bottom-center' | 'top-center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface SnackProps extends ReactHTMLElementAttributes<SnackElement> {
	id: string;
	message: string | string[];
	title?: string;
	type?: NotificationTypes;
	size?: 'flex' | 'medium' | 'large';
	position?: SnackPosition;
	oneLine?: boolean;
	onCloseButtonClick?: (event: React.MouseEvent<IconElement>) => void;
	duration?: number;
}

function getIconByType(iconType?: NotificationTypes) {
	if (iconType === 'alert') return <AlertCircleIcon />;
	if (iconType === 'info') return <InfoIcon />;
	if (iconType === 'success') return <CheckCircleIcon />;
	if (iconType === 'error') return <XCircleIcon />;
	if (iconType === 'warn') return <AlertTriangleIcon />;
	return <AlertCircleIcon />;
}

export const Snack = forwardRef<SnackElement, SnackProps>(({
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
}, ref) => {
	const snackRef = useRef<HTMLDivElement>(null);
	const { remove } = useSnack();

	const componentClass = [
		size && s[size],
		type && s[type],
		position && s[position],
	];

	const contentViewClass = oneLine && s.oneLine;

	const snackTitle = title
	|| ((type === 'alert' && 'Повідомлення!')
	|| (type === 'info' && 'Інформація!')
		|| (type === 'success' && 'Успіх!')
		|| (type === 'error' && 'Помилка!')
		|| (type === 'warn' && 'Попередження!'));

	const closeSnack = () => {
		snackRef.current?.classList.add(s.hideSnackAnimation);
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
			className={asm.join(s.Snack, className, componentClass)}
			ref={mergeRefs([ref, snackRef])}
			{...rest}
		>
			<div className={s.content}>
				<Icon>
					{getIconByType(type)}
				</Icon>
				<div className={asm.join(s.textContent, contentViewClass)}>
					<Typography component="h6" className={s.title}>
						{snackTitle}
					</Typography>
					{typeof message === 'string'
						? (
							<Typography component="p1" className={s.message}>
								{message}
							</Typography>
						) : message.map((text) => (
							<Typography key={text} component="p1" className={s.message}>
								{text}
							</Typography>
						))}
				</div>
				{duration > 0 && <LoaderCounter timer={duration} />}
			</div>
			<Icon size="small" onClick={handleCloseButtonClick}>
				<XIcon size="small" />
			</Icon>
		</div>
	);
});

Snack.displayName = 'Snack';

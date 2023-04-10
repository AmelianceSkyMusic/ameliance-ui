import { useEffect, useState } from 'react';

import asm from 'asm-ts-scripts';

import { Portal } from '../Portal';
import { Toast } from './Toast';

import s from './ToastList.module.scss';

interface ToastList {
	id: string;
	message: string;
	title?: string;
	noTitle?: boolean;
	type?: 'alert' | 'info' | 'success' | 'error' | 'warn';
	size?: 'flex' | 'medium' | 'large';
	position?: 'bottom-center' | 'top-center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
	oneLine?: boolean;
	autoDeleteTime?: number;
}

export interface ToastListProps {
	onClearList: () => void;
	id: string;
	message: string;
	title?: string;
	noTitle?: boolean;
	type?: 'alert' | 'info' | 'success' | 'error' | 'warn';
	size?: 'flex' | 'medium' | 'large';
	position?: 'bottom-center' | 'top-center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
	oneLine?: boolean;
	autoDeleteTime?: number;
	maxCount?: number;
}

export function ToastList({
	onClearList,
	id,
	message,
	title,
	noTitle,
	type = 'alert',
	size = 'flex',
	position = 'top-right',
	oneLine,
	autoDeleteTime = 0,
	maxCount = 1,
}: ToastListProps) {
	const [isInit, setIsInit] = useState(true);

	const [toastList, setList] = useState<ToastList[]>([]);

	const removeToast = (toastId: string) => {
		setList((prev) => prev.filter((toast) => toast.id !== toastId));
	};

	useEffect(() => {
		setIsInit(false);
		setList((prev) => {
			const newToast = {
				id,
				message,
				title,
				noTitle,
				type,
				size,
				position,
				oneLine,
				autoDeleteTime,
			};
			// *----- get new toastList with needed direction for render on screen -----
			if (position.includes('top')) return [...prev, newToast].slice(-maxCount);
			return [newToast, ...prev].slice(0, maxCount);
		});

		if (autoDeleteTime > 0) {
			setTimeout(() => {
				removeToast(id);
			}, autoDeleteTime);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		if (!isInit && toastList.length < 1) onClearList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toastList]);

	const toastPositionClass = (position === 'bottom-center' && s.bottomCenter)
	|| (position === 'top-center' && s.topCenter)
	|| (position === 'top-left' && s.topLeft)
	|| (position === 'top-right' && s.topRight)
	|| (position === 'bottom-left' && s.bottomLeft)
	|| (position === 'bottom-right' && s.bottomRight);

	const handleClickCloseButton = (event: React.MouseEvent<HTMLSpanElement>) => {
		const elem = event.currentTarget;
		const currentToastId = elem.parentElement?.getAttribute('data-id');
		if (currentToastId) removeToast(currentToastId);
	};

	return (
		<Portal>
			<div className={asm.join(s.ToastList, toastPositionClass)}>
				{toastList.length > 0 && toastList.map((toast) => (
					<Toast
						id={toast.id}
						message={toast.message}
						title={toast.title}
						noTitle={toast.noTitle}
						type={toast.type}
						size={toast.size}
						position={toast.position}
						oneLine={toast.oneLine}
						key={toast.id}
						autoDeleteTime={autoDeleteTime}
						onCloseButtonClick={handleClickCloseButton}
					/>
				))}
			</div>
		</Portal>
	);
}

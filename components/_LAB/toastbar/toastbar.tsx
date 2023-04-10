import {
	createContext, useContext, useMemo, useState,
} from 'react';

import asm from 'asm-ts-scripts';

import type { ToastProps } from './Toast';
import { ToastsContainer } from './ToastsContainer';

interface ToastContext {
	add: (toast: Omit<ToastProps, 'id'>) => void;
	remove: (toastId: string) => void;
	position: ToastProps['position'];
}

const ToastContext = createContext<ToastContext>({} as ToastContext);

// *----- export contextual  hook -----
export const useToast = () => useContext(ToastContext);

interface ToastBarProviderProps {
	maxToast?: number;
	children: React.ReactElement;
}

export function ToastBarProvider({
	maxToast = 1,
	children,
}: ToastBarProviderProps) {
	const [toasts, setToasts] = useState<ToastProps[]>([]);
	const [position, setPosition] = useState<ToastProps['position']>('top-right');

	const add = (toast: Omit<ToastProps, 'id'>) => {
		if (toast.position && toast.position !== position) setPosition(toast.position);

		setToasts((prevToasts) => {
			const newPrevToasts = prevToasts.length < maxToast ? prevToasts : prevToasts.slice(1);
			const newToast = {
				...toast,
				id: asm.getRandomNumber(100_000_000, 999_999_999).toString(),
			};
			return [
				...newPrevToasts,
				newToast,
			];
		});
	};

	const remove = (toastId: string) => {
		setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId));
	};

	const contextValue = useMemo(() => ({
		add, remove, position,
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}), []);

	return (
		<ToastContext.Provider value={contextValue}>
			{children}
			<ToastsContainer toasts={toasts} />
		</ToastContext.Provider>
	);
}

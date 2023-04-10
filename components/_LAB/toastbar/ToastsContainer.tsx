import asm from 'asm-ts-scripts';

import { Block } from '../../blocks/Block';
import { Portal } from '../../Portal';
import type { ToastProps } from './Toast';
import { Toast } from './Toast';

import s from './ToastsContainer.module.scss';

interface ToastsContainer {
	toasts: ToastProps[];
	position?: {
		horizontal: 'left' | 'center' | 'right';
		vertical: 'top' | 'center' | 'bottom';
	};
}

export function ToastsContainer({
	toasts,
	position = {
		horizontal: 'right',
		vertical: 'top',
	},
}: ToastsContainer) {
	const componentPositionClass = s[`${position.horizontal}-${position.vertical}`];

	if (!toasts || toasts.length <= 0) return null;

	return (
		<Portal>
			<Block className={asm.join(s.ToastsContainer, componentPositionClass)}>
				<>
					{toasts.map((toast) => (
						<Toast
							key={toast.id}
							id={toast.id}
							message={toast.message}
							title={toast.title}
							type={toast.type}
							size={toast.size}
							position={toast.position}
							oneLine={toast.oneLine}
							onCloseButtonClick={toast.onCloseButtonClick}
							duration={toast.duration}
						/>
					))}
				</>
			</Block>
		</Portal>
	);
}

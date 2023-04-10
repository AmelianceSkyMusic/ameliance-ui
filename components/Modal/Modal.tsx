import { forwardRef, useEffect, useState } from 'react';

import asm from 'asm-ts-scripts';

import { Backdrop } from '../Backdrop';
import { Button } from '../Button';
import { Portal } from '../Portal';
import { Typography } from '../Typography';

import s from './Modal.module.scss';

export type ModalElement = HTMLDivElement;

interface Button {
	text?: string;
	onClick?: () => void;
	icon?: React.ReactElement;
	iconPosition?: 'left' | 'right';
	disabled?: boolean;
	buttonIcon?: boolean;
	size?: ComponentSizes;
	isSubmit?: boolean;
	type?: 'primary' | 'secondary';
	form?: string;
}

export interface ModalProps extends ReactHTMLElementAttributes<ModalElement> {
	type?: NotificationTypes;
	title?: string;
	noTitle?: boolean;
	children: React.ReactElement;
	mainButton?: Button;
	secondButton?: Button;
	backdrop?: {
		onClick?: { (): void } | null;
		disabled?: boolean;
	};
	onClose?: () => void;
	noButtons?: boolean;
	size?: 'flex' | 'medium' | 'large';
}

export const Modal = forwardRef<ModalElement, ModalProps>(({
	type,
	title,
	noTitle,
	mainButton = {
		text: 'Ок',
	},
	secondButton,
	backdrop,
	onClose,
	noButtons = false,
	size = 'flex',
	children,
	className,
	...rest
}, ref) => {
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

	const typeClass = type ? s[type] : null;

	const modalTitle = title
	|| ((type === 'alert' && 'Повідомлення!')
	|| (type === 'info' && 'Інформація!')
	|| (type === 'success' && 'Успіх!')
	|| (type === 'error' && 'Помилка')
	|| (type === 'warn' && 'Попередження!'));

	useEffect(() => {
		document.body.style.overflow = 'hidden';
	}, []);

	const sizeClass =	(size === 'medium' && s.medium)
	|| (size === 'large' && s.large);

	return (
		<Portal>
			<div
				className={asm.join(s.Modal, className, show)}
				onAnimationEnd={handleAnimationend}
				ref={ref}
				{...rest}
			>
				<Backdrop onClick={backdropClickHandler} disabled={backdrop?.disabled} show={show === 'show'} />
				<div className={asm.join(sizeClass, s.content)}>
					<div className={type && asm.join(s.titleContainer, typeClass, type)}>
						<Typography component="h4" className={s.title}>
							{!noTitle && modalTitle}
						</Typography>
					</div>
					<div className={s.body}>
						{children}
					</div>
					{!noButtons && (
						<div className={s.buttons}>
							{isSecondButton && (
								<Button
									size={secondButton?.size}
									type={secondButton?.type || 'secondary'}
									onClick={() => secondButtonHandler()}
									// form={secondButton?.form}
									submit={secondButton?.isSubmit}
									disabled={secondButton?.disabled}
								>
									{secondButton?.iconPosition === 'left' && secondButton?.icon}
									{!secondButton?.icon && (!secondButton?.icon ? secondButton?.text : 'Відміна')}
									{!secondButton?.text && secondButton?.icon && secondButton?.icon}
									{secondButton?.iconPosition === 'left' && secondButton?.icon}
								</Button>
							)}
							<Button
								size={mainButton?.size}
								type={mainButton?.type || 'primary'}
								onClick={() => mainButtonHandler()}
								// form={mainButton?.form}
								submit={mainButton?.isSubmit}
								disabled={mainButton?.disabled}
							>
								{mainButton?.iconPosition === 'left' && mainButton?.icon}
								{!mainButton?.icon && (!mainButton?.icon ? mainButton?.text : 'Ок')}
								{!mainButton?.text && mainButton?.icon && mainButton?.icon}
								{mainButton?.iconPosition === 'right' && mainButton?.icon}
							</Button>
						</div>
					)}
				</div>
			</div>
		</Portal>
	);
});

Modal.displayName = 'Modal';

// import { useEffect, useState } from 'react';

// import asm from 'asm-ts-scripts';

// import { Backdrop } from '../Backdrop';
// import { Button } from '../Button';
// import { Portal } from '../Portal';
// import { Typography } from '../Typography';

// import s from './Modal.module.scss';

// interface Button {
// 	text?: string;
// 	onClick?: () => void;
// 	icon?: React.ReactElement;
// 	iconPosition?: 'left' | 'right';
// 	disabled?: boolean;
// 	buttonIcon?: boolean;
// 	size?: ComponentSizes;
// 	isSubmit?: boolean;
// 	type?: 'primary' | 'secondary';
// 	form?: string;
// }

// interface ModalProps {
// 	type?: NotificationTypes;
// 	title?: string;
// 	noTitle?: boolean;
// 	children: React.ReactElement;
// 	className?: string;
// 	mainButton?: Button;
// 	secondButton?: Button;
// 	backdrop?: {
// 		onClick?: { (): void } | null;
// 		disabled?: boolean;
// 	};
// 	onClose?: () => void;
// 	noButtons?: boolean;
// 	size?: 'flex' | 'medium' | 'large';
// }

// export function Modal({
// 	type,
// 	title,
// 	children,
// 	noTitle,
// 	className,
// 	mainButton = {
// 		text: 'Ок',
// 	},
// 	secondButton,
// 	backdrop,
// 	onClose,
// 	noButtons = false,
// 	size = 'flex',
// }: ModalProps) {
// 	const [show, setShow] = useState('show');

// 	const isSecondButton = secondButton && !asm.isObjectEmpty(secondButton);

// 	const closeModal = () => {
// 		setShow('');
// 	};

// 	const handleAnimationend = () => {
// 		if (show !== 'show') {
// 			closeModal();
// 			document.body.style.overflow = 'visible';
// 			if (onClose) onClose();
// 		}
// 	};

// 	const backdropClickHandler = () => {
// 		if (backdrop?.onClick) backdrop.onClick();
// 		closeModal();
// 	};

// 	const mainButtonHandler = () => {
// 		if (mainButton?.onClick) mainButton.onClick();
// 		if (!mainButton?.form) closeModal();
// 	};

// 	const secondButtonHandler = () => {
// 		if (secondButton?.onClick) secondButton.onClick();
// 		if (!secondButton?.form) closeModal();
// 	};

// 	const typeClass = null
// 	|| (type === 'alert' && s.alert)
// 	|| (type === 'info' && s.info)
// 	|| (type === 'success' && s.success)
// 	|| (type === 'error' && s.error)
// 	|| (type === 'warn' && s.warn);

// 	const modalTitle = title
// 	|| ((type === 'alert' && 'Повідомлення!')
// 	|| (type === 'info' && 'Інформація!')
// 	|| (type === 'success' && 'Успіх!')
// 	|| (type === 'error' && 'Помилка')
// 	|| (type === 'warn' && 'Попередження!'));

// 	useEffect(() => {
// 		document.body.style.overflow = 'hidden';
// 	}, []);

// 	const sizeClass =	(size === 'medium' && s.medium)
// 	|| (size === 'large' && s.large);

// 	return (
// 		<Portal>
// 			<div
// 				className={asm.join(s.Modal, className, show)}
// 				onAnimationEnd={handleAnimationend}
// 			>
// 				<Backdrop onClick={backdropClickHandler} disabled={backdrop?.disabled} show={show === 'show'} />
// 				<div className={asm.join(sizeClass, s.content)}>
// 					<div className={type && asm.join(s.title, typeClass, type)}>
// 						<Typography component="h4">
// 							{!noTitle && modalTitle}
// 						</Typography>
// 					</div>
// 					<div className={s.body}>
// 						{children}
// 					</div>
// 					{!noButtons && (
// 						<div className={s.buttons}>
// 							{isSecondButton && (
// 								<Button
// 									size={secondButton?.size}
// 									type={secondButton?.type || 'secondary'}
// 									onClick={() => secondButtonHandler()}
// 									// form={secondButton?.form}
// 									submit={secondButton?.isSubmit}
// 									disabled={secondButton?.disabled}
// 								>
// 									{secondButton?.iconPosition === 'left' && secondButton?.icon}
// 									{!secondButton?.icon && (!secondButton?.icon ? secondButton?.text : 'Відміна')}
// 									{!secondButton?.text && secondButton?.icon && secondButton?.icon}
// 									{secondButton?.iconPosition === 'left' && secondButton?.icon}
// 								</Button>
// 							)}
// 							<Button
// 								size={mainButton?.size}
// 								type={mainButton?.type || 'primary'}
// 								onClick={() => mainButtonHandler()}
// 								// form={mainButton?.form}
// 								submit={mainButton?.isSubmit}
// 								disabled={mainButton?.disabled}
// 							>
// 								{mainButton?.iconPosition === 'left' && mainButton?.icon}
// 								{!mainButton?.icon && (!mainButton?.icon ? mainButton?.text : 'Ок')}
// 								{!mainButton?.text && mainButton?.icon && mainButton?.icon}
// 								{mainButton?.iconPosition === 'right' && mainButton?.icon}
// 							</Button>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</Portal>
// 	);
// }

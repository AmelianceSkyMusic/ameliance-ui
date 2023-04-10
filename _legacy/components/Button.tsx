import asm from 'asm-ts-scripts';

interface Button {
	children: string;
	callback: () => void;
	isButtonIcon?: boolean;
	size?: 'normal' | 'small';
	iconPosition?: 'left' | 'right';
	icon?: string | undefined;
	disabled?: boolean;
	type?: 'primary' | 'secondary';
	id?: string;
}

export function Button({
	children,
	callback,
	iconPosition,
	icon,
	id,
	isButtonIcon,
	size,
	type = 'primary',
	disabled = false,
}: Button) {
	let buttonClass;
	if (size === 'small') {
		if (isButtonIcon && icon) {
			buttonClass = 'button-icon-sm';
		} else {
			buttonClass = 'button-sm';
		}
	} else if (isButtonIcon && icon) {
		buttonClass = 'button-icon';
	} else {
		buttonClass = 'button';
	}

	const buttonClassAndType = `${buttonClass} ${type}`;

	return (
		<button
			type="button"
			id={id}
			className={buttonClassAndType}
			onClick={callback}
			disabled={disabled}
		>
			{!isButtonIcon && icon && iconPosition === 'left' && (
				<span className={`icon left ${icon}`} />
			)}
			{isButtonIcon ? <span className={`icon center ${icon}`} /> : <span className="label">{children}</span>}
			{!isButtonIcon && icon && iconPosition === 'right' && (
				<span className={`icon right ${icon}`} />
			)}
		</button>
	);
}

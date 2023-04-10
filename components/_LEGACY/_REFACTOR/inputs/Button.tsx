interface Button {
	children?: string;
	onClick?: () => void;
	buttonIcon?: boolean;
	size?: 'normal' | 'small';
	iconPosition?: 'left' | 'right';
	icon?: string | undefined;
	disabled?: boolean;
	type?: 'primary' | 'secondary';
	id?: string;
	isSubmit?: boolean;
	form?: string;
}

export function Button({
	children,
	onClick,
	iconPosition,
	icon,
	id,
	buttonIcon,
	size,
	type = 'primary',
	disabled = false,
	isSubmit,
	form,
}: Button) {
	let buttonClass;
	if (size === 'small') {
		if (buttonIcon && icon) {
			buttonClass = 'button-icon-sm';
		} else {
			buttonClass = 'button-sm';
		}
	} else if (buttonIcon && icon) {
		buttonClass = 'button-icon';
	} else {
		buttonClass = 'button';
	}

	const buttonClassAndType = `${buttonClass} ${type}`;

	return (
		<button
			type={isSubmit ? 'submit' : 'button'}
			id={id}
			className={buttonClassAndType}
			onClick={onClick}
			disabled={disabled}
			form={form}
		>
			{!buttonIcon && icon && iconPosition === 'left' && (
				<span className={`icon left ${icon}`} />
			)}
			{buttonIcon ? <span className={`icon center ${icon}`} /> : <span className="label">{children}</span>}
			{!buttonIcon && icon && iconPosition === 'right' && (
				<span className={`icon right ${icon}`} />
			)}
		</button>
	);
}

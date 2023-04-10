import { forwardRef } from 'react';

export type FormElement = HTMLFormElement;

export type FormProps = ReactHTMLElementAttributes<FormElement>;

export const Form = forwardRef<FormElement, FormProps>(({
	children,
	className,
	...rest
}, ref) => (
	<form
		className={className}
		ref={ref}
		{...rest}
	>
		{children}
	</form>
));

Form.displayName = 'Form';

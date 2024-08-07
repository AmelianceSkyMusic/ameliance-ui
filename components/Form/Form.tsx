import { forwardRef } from 'react';

export type FormElement = HTMLFormElement;

export type FormProps = React.ComponentPropsWithoutRef<'form'>;

export const Form = forwardRef<FormElement, FormProps>(({ children, className, ...rest }, ref) => (
   <form className={className} ref={ref} {...rest}>
      {children}
   </form>
));

Form.displayName = 'Form';

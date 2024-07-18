import { forwardRef } from 'react';
// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import { Typography } from '../typography';

import typography from '../typography/typography.module.scss';
import cs from './common-style.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type EmailInputElement = HTMLInputElement;

export type EmailInputProps = React.ComponentPropsWithoutRef<'input'> & {
   register?: FieldValues;
   errors?: FieldErrors<TFieldValues>;
};

export const EmailInput = forwardRef<EmailInputElement, EmailInputProps>(
   ({ register, errors, placeholder, children, ...rest }, ref) => {
      const errorMessage = errors ? errors[register?.name]?.message : '';

      return (
         <div className={cs.container}>
            <Typography component="h5">{children}</Typography>
            <div className={cs.inputBlockContainer}>
               <label>
                  <input
                     type="email"
                     className={join(cs.input, typography.input)}
                     placeholder={placeholder}
                     ref={ref}
                     {...register}
                     {...rest}
                  />
               </label>
               {register && (
                  <Typography component="p2" className={join(cs.error)}>
                     {typeof errorMessage === 'string' && errorMessage}
                  </Typography>
               )}
            </div>
         </div>
      );
   },
);

EmailInput.displayName = 'EmailInput';

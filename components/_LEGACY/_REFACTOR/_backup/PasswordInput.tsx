import React from 'react';
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import c from './password-input.module.scss';

interface IProps {
   register: FieldValues;
   errors: Record<string, FieldError> | undefined;
   placeholder?: string;
   children?: React.ReactNode;
   testId?: string;
}

export function PasswordInput({ register, errors, children, placeholder, testId }: IProps) {
   return (
      <div className={c.PasswordInput}>
         <span className="h5">{children}</span>
         <label>
            <input
               type="password"
               className={asm.join(c.input, 'input text')}
               {...register}
               placeholder={placeholder}
               data-testid={testId}
            />
         </label>
         <p className={asm.join(c.error, 'p2 input-error')}>
            {(errors && errors[register.name] && errors[register.name].message) || ''}
         </p>
      </div>
   );
}

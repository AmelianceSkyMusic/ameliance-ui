import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import c from '../TextInput.module.scss';

interface IProps {
   register: FieldValues;
   errors: Record<string, FieldError> | undefined;
   placeholder?: string;
   children?: React.ReactNode;
   testId?: string;
}

export function TextInput({ register, errors, children, placeholder, testId }: IProps) {
   return (
      <div className={c.TextInput}>
         <span className="h5">{children}</span>
         <label>
            <input
               type="input"
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

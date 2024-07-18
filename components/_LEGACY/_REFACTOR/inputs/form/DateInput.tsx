import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import c from './date-input.module.scss';

interface IProps {
   register: FieldValues;
   errors: Record<string, FieldError> | undefined;
   children?: React.ReactNode;
   testId?: string;
}

export function DateInput({ register, errors, children, testId }: IProps) {
   return (
      <div className={c.DateInput}>
         <span className="h3">{children}</span>
         <label>
            <input
               type="date"
               className={asm.join(c.input, 'input date')}
               {...register}
               data-testid={testId}
            />
         </label>
         <p className={asm.join(c.error, 'p2 input-error')}>
            {(errors && errors[register.name] && errors[register.name].message) || ''}
         </p>
      </div>
   );
}

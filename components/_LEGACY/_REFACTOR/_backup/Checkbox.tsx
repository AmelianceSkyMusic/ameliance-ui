import React from 'react';
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import c from './checkbox.module.scss';

interface IProps {
   register: FieldValues;
   errors: Record<string, FieldError> | undefined;
   label: string;
   placeholder?: string;
   children?: React.ReactNode;
   testId?: string;
}

export function Checkbox({ register, errors, label, children, testId }: IProps) {
   return (
      <div className={c.Checkbox}>
         <span className="h3">{children}</span>
         <label className={c.container}>
            <input type="checkbox" className="checkbox__input" {...register} data-testid={testId} />
            <span className="p1 checkbox__label">{label}</span>
         </label>
         <p className={asm.join(c.error, 'p2 input-error')}>
            {(errors && errors[register.name] && errors[register.name].message) || ''}
         </p>
      </div>
   );
}

import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import c from './switcher.module.scss';

interface IProps {
   register: FieldValues;
   errors: Record<string, FieldError> | undefined;
   label: string;
   placeholder?: string;
   children?: React.ReactNode;
   testId?: string;
}

export function Switcher({ register, errors, label, children, testId }: IProps) {
   return (
      <div className={c.Switcher}>
         <span className="h3">{children}</span>
         <label className={c.container}>
            <input
               type="checkbox"
               className={c.switcherCheckbox}
               {...register}
               data-testid={testId}
            />
            <div className={c.element} />
            <span className="p1">{label}</span>
         </label>
         <p className={asm.join(c.error, 'p2 input-error')}>
            {(errors && errors[register.name] && errors[register.name].message) || ''}
         </p>
      </div>
   );
}

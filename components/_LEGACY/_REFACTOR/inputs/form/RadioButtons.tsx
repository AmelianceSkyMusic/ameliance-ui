import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import c from './radio-buttons.module.scss';

interface IProps {
   register: FieldValues;
   errors: Record<string, FieldError> | undefined;
   labels: (string | number)[];
   placeholder?: string;
   children?: React.ReactNode;
   testId?: string;
}

export function RadioButtons({ register, errors, labels, children, testId }: IProps) {
   return (
      <div className={c.RadioButtons}>
         <span className="h3">{children}</span>
         <div className={c.radioButtonContainer}>
            {labels.map((value) => (
               <div key={`${value}`} className="radio-button">
                  <label className={c.container}>
                     <input
                        type="radio"
                        // className="radio-button__input" // TODO: check is need
                        {...register}
                        value={value.toString()}
                        data-testid={testId}
                     />
                     <span className="p1">{value}</span>
                  </label>
               </div>
            ))}
         </div>
         <p className={asm.join(c.error, 'p2 input-error')}>
            {(errors && errors[register.name] && errors[register.name].message) || ''}
         </p>
      </div>
   );
}

import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import c from '../Dropdown.module.scss';

interface IProps {
   options: string[];
   register: FieldValues;
   errors: Record<string, FieldError> | undefined;
   placeholder?: string;
   children?: React.ReactNode;
   testId?: string;
}

export function Dropdown({ options, register, errors, children, testId }: IProps) {
   return (
      <div className={c.Dropdown}>
         <span className="h3">{children}</span>
         <label>
            <select
               className={asm.join(c.input, 'input input dropdown')}
               {...register}
               data-testid={testId}
            >
               <option className="dropdown__option"> </option>
               {options.map((optionValue) => (
                  <option className="dropdown__option" key={optionValue} value={optionValue}>
                     {optionValue}
                  </option>
               ))}
            </select>
         </label>
         <p className={asm.join(c.input, 'p2 input-error')}>
            {(errors && errors[register.name] && errors[register.name].message) || ''}
         </p>
      </div>
   );
}

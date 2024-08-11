import { forwardRef } from 'react';

// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import { Typography } from '../typography';

import typography from '../typography/typography.module.scss';
import cs from './common-style.module.scss';
import c from './radio-button.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type RadioButtonElement = HTMLInputElement;

export type RadioButtonProps = React.ComponentPropsWithoutRef<'input'> & {
   register?: FieldValues;
   errors?: FieldErrors<TFieldValues>;
   labels: (string | number)[];
};

export const RadioButton = forwardRef<RadioButtonElement, RadioButtonProps>(
   ({ register, errors, labels, children, ...rest }, ref) => {
      const errorMessage = errors ? errors[register?.name]?.message : '';

      return (
         <div className={cs.container}>
            <Typography component="h5">{children}</Typography>
            <div className={cs.inputBlockContainer}>
               <div className={c.elementsContainer}>
                  {labels.map((value) => (
                     <label key={value} className={c.element}>
                        <input
                           type="radio"
                           className={join(c.input, typography.input)}
                           value={value.toString()}
                           ref={ref}
                           {...register}
                           {...rest}
                        />
                        <Typography component="p1">{value}</Typography>
                     </label>
                  ))}
               </div>
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

RadioButton.displayName = 'RadioButton';

import { forwardRef } from 'react';
// @ts-ignore
import type { FieldErrors, FieldValues } from 'react-hook-form';

import { Typography } from '../../../typography';

import type { InputWrapperCommonProps } from '../input-wrapper/input-wrapper';
import { InputWrapper } from '../input-wrapper/input-wrapper';

import cs from '../common-style.module.scss';
import c from './tabs.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type TabsElement = HTMLInputElement;

export type TabsProps = React.ComponentPropsWithoutRef<'input'> &
   InputWrapperCommonProps & {
      name: string;
      labels: (string | number)[];
      defaultValue?: string;
      register?: FieldValues;
      errors?: FieldErrors<FieldValues>;
   };

export const Tabs = forwardRef<TabsElement, TabsProps>(
   (
      {
         label,
         required,
         disabled,
         register,
         errors,
         name,
         defaultValue,
         labels,
         className,
         ...rest
      },
      ref,
   ) => {
      const error = errors ? errors[register?.name]?.message?.toString() : '';
      const componentClass = [error && cs.error, disabled && cs.disabled, className];

      return (
         <InputWrapper
            label={label}
            error={error}
            required={required}
            disabled={disabled}
            className={join(componentClass)}
         >
            <div className={c.elementsContainer}>
               {labels.map((value) => (
                  <label key={value} className={c.element}>
                     <input
                        type="radio"
                        className={c.input}
                        value={value.toString()}
                        ref={ref}
                        name={name}
                        checked={defaultValue?.toString() === value.toString()}
                        {...register}
                        {...rest}
                     />
                     <Typography component="p2" className={c.label}>
                        {value}
                     </Typography>
                     <div className={c.underline} />
                  </label>
               ))}
            </div>
         </InputWrapper>
      );
   },
);

Tabs.displayName = 'Tabs';

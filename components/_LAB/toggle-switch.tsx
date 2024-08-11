// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';
import { Typography } from '../typography';
import cs from '../inputs/common-style.module.scss';
import c from './toggle-switch.module.scss';
import React, { forwardRef } from 'react';

export type ToggleSwitchElement = HTMLInputElement;

export type ToggleSwitchProps = React.ComponentPropsWithoutRef<'input'> & {
   register?: FieldValues;
   errors?: FieldErrors<TFieldValues>;
   label: string;
};

export const ToggleSwitch = forwardRef<ToggleSwitchElement, ToggleSwitchProps>(
   ({ register = null, errors, label, onClick, children, className, ...rest }, ref) => {
      const handleLabelOnClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
         if (onClick) onClick(event);
      };

      const errorMessage = errors ? errors[register?.name]?.message : '';

      return (
         <div className={cs.container}>
            {children && <Typography component="h3">{children}</Typography>}
            <div className={cs.inputBlockContainer}>
               <label className={c.container}>
                  <input
                     type="checkbox"
                     className={c.checkbox}
                     onClick={handleLabelOnClick}
                     ref={ref}
                     {...register}
                     {...rest}
                  />
                  <div className={c.element}></div>

                  <Typography component="p1">{label}</Typography>
               </label>
               {register && (
                  <Typography component="p2" className={cs.error}>
                     {typeof errorMessage === 'string' && errorMessage}
                  </Typography>
               )}
            </div>
         </div>
      );
   },
);

ToggleSwitch.displayName = 'ToggleSwitch';

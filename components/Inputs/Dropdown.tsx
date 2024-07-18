import { forwardRef, useState } from 'react';
// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import { Icon } from '../icon';
import { ChevronDownIcon } from '../icons/chevron-down-icon';
import { Typography } from '../typography';

import typography from '../typography/typography.module.scss';
import cs from './common-style.module.scss';
import c from './dropdown.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type DropdownElement = HTMLSelectElement;

export type DropdownProps = React.ComponentPropsWithoutRef<'select'> & {
   options: string[];
   register?: FieldValues;
   errors?: FieldErrors<TFieldValues>;
   selected?: string;
   blank?: boolean;
   onDropdownChange?: (key: string) => void;
};

export const Dropdown = forwardRef<DropdownElement, DropdownProps>(
   (
      {
         options,
         register,
         errors,
         selected,
         blank,
         onDropdownChange,
         children,
         className,
         ...rest
      },
      ref,
   ) => {
      const [selectedValue, setSelectedValue] = useState(selected);
      const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
         setSelectedValue(event.target.value);
         if (onDropdownChange) {
            onDropdownChange(event.target.value);
         }
      };

      const errorMessage = errors ? errors[register?.name]?.message : '';

      return (
         <div className={cs.container}>
            <Typography component="h5">{children}</Typography>
            <div className={cs.inputBlockContainer}>
               <label className={c.inputContainer}>
                  <select
                     className={join(c.input, cs.input, typography.input, className)}
                     value={selectedValue}
                     onChange={handleOnChange}
                     ref={ref}
                     {...register}
                     {...rest}
                  >
                     {blank && <option> </option>}
                     {options.map((optionValue) => (
                        <option key={optionValue} value={optionValue}>
                           {optionValue}
                        </option>
                     ))}
                  </select>
                  <Icon
                     size="custom"
                     style={{ width: 20, height: 20 }}
                     className={c.icon}
                     onClick={() => null}
                  >
                     <ChevronDownIcon size="custom" style={{ width: 20, height: 20 }} />
                  </Icon>
               </label>
               {errors && (
                  <Typography component="p2" className={join(cs.error)}>
                     {typeof errorMessage === 'string' && errorMessage}
                  </Typography>
               )}
            </div>
         </div>
      );
   },
);

Dropdown.displayName = 'Dropdown';

import { forwardRef } from 'react';
// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import { Typography } from '../typography';

import typography from '../typography/typography.module.scss';
import cs from './common-style.module.scss';
import c from './text-area.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type TextAreaElement = HTMLTextAreaElement;

export type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> & {
   register?: FieldValues;
   errors?: FieldErrors<TFieldValues>;
};

export const TextArea = forwardRef<TextAreaElement, TextAreaProps>(
   ({ register, errors, placeholder, className, children, ...rest }, ref) => {
      const errorMessage = errors ? errors[register?.name]?.message : '';

      return (
         <div className={cs.container}>
            <Typography component="h5">{children}</Typography>
            <div className={cs.inputBlockContainer}>
               <label>
                  <textarea
                     className={join(cs.input, c.root, typography.input, className)}
                     placeholder={placeholder}
                     ref={ref}
                     {...register}
                     {...rest}
                  />
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

TextArea.displayName = 'TextArea';

// import React, { useRef } from 'react';

// import asm from 'asm-ts-scripts';

// import c from './text-area.module.scss';
// import { useAutoResizeTextArea } from './useAutoResizeTextArea';

// interface IProps {
// 	value?: string;
// 	placeholder?: string;
// 	children?: React.ReactNode;
// 	testId?: string;
// 	onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
// 	onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
// }

// export function TextArea({
// 	value, children, placeholder, testId, onChange, onKeyDown,
// }: IProps) {

// 	const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
// 		if (onChange) onChange(event);
// 	};

// 	const textAreaRef = useRef<HTMLTextAreaElement>(null);

// 	useAutoResizeTextArea(textAreaRef.current, value || '');

// 	return (
// 		<div className={c.TextArea}>
// 			<span className="h3">{children}</span>
// 			<label>
// 				<textarea
// 					value={value}
// 					onKeyDown={onKeyDown}
// 					onChange={handleSearchChange}
// 					className={asm.join(c.input, 'input text')}
// 					placeholder={placeholder}
// 					rows={1}
// 					ref={textAreaRef}
// 					data-testid={testId}
// 					style={{ overflow: 'hidden', resize: 'vertical' }}
// 				/>
// 			</label>
// 		</div>
// 	);
// }
// function useAutoSizeTextArea(current: HTMLTextAreaElement | null, arg1: string) {
// 	throw new Error('Function not implemented.');
// }

import React, { useRef } from 'react';

import c from './text-area.module.scss';
import { useAutoResizeTextArea } from './use-auto-resize-text-area';

interface IProps {
   value?: string;
   placeholder?: string;
   children?: React.ReactNode;
   testId?: string;
   onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
   onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({ value, children, placeholder, testId, onChange, onKeyDown }: IProps) {
   const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) onChange(event);
   };

   const textAreaRef = useRef<HTMLTextAreaElement>(null);

   useAutoResizeTextArea(textAreaRef.current, value || '');

   return (
      <div className={c.TextArea}>
         <span className="h3">{children}</span>
         <label>
            <textarea
               value={value}
               onKeyDown={onKeyDown}
               onChange={handleSearchChange}
               className={asm.join(c.input, 'input text')}
               placeholder={placeholder}
               rows={1}
               ref={textAreaRef}
               data-testid={testId}
               style={{ overflow: 'hidden', resize: 'vertical' }}
            />
         </label>
      </div>
   );
}
function useAutoSizeTextArea(current: HTMLTextAreaElement | null, arg1: string) {
   throw new Error('Function not implemented.');
}

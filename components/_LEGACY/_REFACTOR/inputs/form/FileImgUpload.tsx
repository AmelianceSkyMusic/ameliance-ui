import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldErrors, FieldValues, TFieldValues } from 'react-hook-form';

import { Avatar } from '../avatar';
import { XIcon } from '../icons/x-icon';

import c from './file-img-upload.module.scss';

interface IProps {
   register: FieldValues;
   errors: Record<string, FieldError> | undefined;
   watch: (name: string) => FieldValues;
   placeholder?: string;
   children?: React.ReactNode;
   testId?: string;
   accept?: string;
   label?: string;
}

export function FileImgUpload({
   register,
   errors,
   watch,
   children,
   placeholder,
   testId,
   accept,
   label,
}: IProps) {
   const [image, setImage] = useState<string>();
   const files = watch(register.name);
   useEffect(() => {
      let fileImage = '';
      if (files && files.length > 0) {
         fileImage = URL.createObjectURL(files[0]);
      }
      setImage(fileImage);
   }, [files]);

   return (
      <div className={c.FileImgUpload}>
         <span className="h5">{children}</span>
         <label className={asm.join(c.container, 'p1')}>
            <input
               className={c.input}
               type="file"
               {...register}
               placeholder={placeholder}
               accept={accept || ''}
               data-testid={testId}
            />
            {!image ? (
               <Avatar>
                  <XIcon />
               </Avatar>
            ) : (
               <Avatar src={image} alt={image} />
            )}
            {label}
         </label>
         <p className={asm.join(c.error, 'p2 input-error')}>
            {(errors && errors[register.name] && errors[register.name].message) || ''}
         </p>
      </div>
   );
}

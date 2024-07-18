import { forwardRef } from 'react';

import c from './file-upload.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export type FileUploadElement = HTMLInputElement;

export type FileUploadProps = React.ComponentPropsWithoutRef<'input'> & {
   icon: string;
};

export const FileUpload = forwardRef<FileUploadElement, FileUploadProps>(
   ({ children, className, ...rest }, ref) => (
      <div>
         <label htmlFor="file">
            {children}
            <input type="file" className={join(c.input, className)} id="file" ref={ref} {...rest} />
         </label>
      </div>
   ),
);

FileUpload.displayName = 'FileUpload';

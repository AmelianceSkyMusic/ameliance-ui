// import { Icon } from '~components/Icon';

import c from './file-upload.module.scss';

interface Props {
   icon: string;
}

export function FileUpload({ icon }: Props) {
   return (
      <div>
         <label htmlFor="file">
            {/* <Icon icon={icon} /> */}
            <input type="file" className={c.input} id="file" />
         </label>
      </div>
   );
}

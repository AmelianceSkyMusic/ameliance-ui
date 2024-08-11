import type { SvgIconProps } from '../svg-icon';
import { SvgIcon } from '../svg-icon';

export function AlertCircleIcon(props: SvgIconProps) {
   return (
      <SvgIcon fill="none" {...props}>
         <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <path d="M12 8V12" strokeLinecap="round" strokeLinejoin="round" />
         <path d="M12 16H12.01" strokeLinecap="round" strokeLinejoin="round" />
      </SvgIcon>
   );
}

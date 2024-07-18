import type { SvgIconProps } from '../svg-icon';
import { SvgIcon } from '../svg-icon';

export function Volume1Icon(props: SvgIconProps) {
   return (
      <SvgIcon fill="none" {...props}>
         <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
         <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </SvgIcon>
   );
}

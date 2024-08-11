import type { SvgIconProps } from '../svg-icon';
import { SvgIcon } from '../svg-icon';

export function ChevronsLeftIcon(props: SvgIconProps) {
   return (
      <SvgIcon fill="none" {...props}>
         <path d="M11 17L6 12L11 7" strokeLinecap="round" strokeLinejoin="round" />
         <path d="M18 17L13 12L18 7" strokeLinecap="round" strokeLinejoin="round" />
      </SvgIcon>
   );
}

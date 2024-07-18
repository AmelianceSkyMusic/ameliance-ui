import type { SvgIconProps } from '../svg-icon';
import { SvgIcon } from '../svg-icon';

export function ChevronLeftIcon(props: SvgIconProps) {
   return (
      <SvgIcon fill="none" {...props}>
         <path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round" />
      </SvgIcon>
   );
}

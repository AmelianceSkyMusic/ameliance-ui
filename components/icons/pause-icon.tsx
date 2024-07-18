import type { SvgIconProps } from '../svg-icon';
import { SvgIcon } from '../svg-icon';

export function PauseIcon(props: SvgIconProps) {
   return (
      <SvgIcon fill="none" {...props}>
         <rect x="6" y="4" width="4" height="16" />
         <rect x="14" y="4" width="4" height="16" />
      </SvgIcon>
   );
}

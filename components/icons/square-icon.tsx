import type { SvgIconProps } from '../svg-icon';
import { SvgIcon } from '../svg-icon';

export function SquareIcon(props: SvgIconProps) {
   return (
      <SvgIcon fill="none" {...props}>
         <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      </SvgIcon>
   );
}

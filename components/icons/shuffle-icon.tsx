import type { SvgIconProps } from '../svg-icon';
import { SvgIcon } from '../svg-icon';

export function ShuffleIcon(props: SvgIconProps) {
   return (
      <SvgIcon fill="none" {...props}>
         <polyline points="16 3 21 3 21 8" />
         <line x1="4" y1="20" x2="21" y2="3" />
         <polyline points="21 16 21 21 16 21" />
         <line x1="15" y1="15" x2="21" y2="21" />
         <line x1="4" y1="4" x2="9" y2="9" />
      </SvgIcon>
   );
}

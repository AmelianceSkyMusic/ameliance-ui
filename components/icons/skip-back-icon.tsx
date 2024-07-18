import type { SvgIconProps } from '../svg-icon';
import { SvgIcon } from '../svg-icon';

export function SkipBackIcon(props: SvgIconProps) {
   return (
      <SvgIcon fill="none" {...props}>
         <polygon points="19 20 9 12 19 4 19 20" />
         <line x1="5" y1="19" x2="5" y2="5" />
      </SvgIcon>
   );
}

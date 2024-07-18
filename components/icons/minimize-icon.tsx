import type { SvgIconProps } from '../svg-icon';
import { SvgIcon } from '../svg-icon';

export function MinimizeIcon(props: SvgIconProps) {
   return (
      <SvgIcon fill="none" {...props}>
         <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
      </SvgIcon>
   );
}

import type { SvgIconProps } from '../svg-icon';
import { SvgIcon } from '../svg-icon';

export function PlayIcon(props: SvgIconProps) {
   return (
      <SvgIcon fill="none" {...props}>
         <polygon points="5 3 19 12 5 21 5 3" />
      </SvgIcon>
   );
}

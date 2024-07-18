import type { SvgIconProps } from '../svg-icon';
import { SvgIcon } from '../svg-icon';

export function VolumeIcon(props: SvgIconProps) {
   return (
      <SvgIcon fill="none" {...props}>
         <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      </SvgIcon>
   );
}

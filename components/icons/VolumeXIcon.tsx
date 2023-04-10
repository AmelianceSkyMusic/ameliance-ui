import type { SvgIconProps } from '../SvgIcon';
import { SvgIcon } from '../SvgIcon';

export function VolumeXIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
			<line x1="23" y1="9" x2="17" y2="15" />
			<line x1="17" y1="9" x2="23" y2="15" />
		</SvgIcon>
	);
}

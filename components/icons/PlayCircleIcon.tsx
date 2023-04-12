import type { SvgIconProps } from '../SvgIcon';
import { SvgIcon } from '../SvgIcon';

export function PlayCircleIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<circle cx="12" cy="12" r="10" />
			<polygon points="10 8 16 12 10 16 10 8" />
		</SvgIcon>
	);
}

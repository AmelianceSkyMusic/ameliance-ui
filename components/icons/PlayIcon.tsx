import type { SvgIconProps } from '../SvgIcon';
import { SvgIcon } from '../SvgIcon';

export function PlayIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<polygon points="5 3 19 12 5 21 5 3" />
		</SvgIcon>
	);
}

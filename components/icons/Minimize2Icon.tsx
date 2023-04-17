import type { SvgIconProps } from '../SvgIcon';
import { SvgIcon } from '../SvgIcon';

export function Minimize2Icon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<polyline points="4 14 10 14 10 20" />
			<polyline points="20 10 14 10 14 4" />
			<line x1="14" y1="10" x2="21" y2="3" />
			<line x1="3" y1="21" x2="10" y2="14" />
		</SvgIcon>
	);
}

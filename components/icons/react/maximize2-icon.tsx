import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function Maximize2Icon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<polyline points="15 3 21 3 21 9" />
			<polyline points="9 21 3 21 3 15" />
			<line x1="21" y1="3" x2="14" y2="10" />
			<line x1="3" y1="21" x2="10" y2="14" />
		</SvgIcon>
	);
}

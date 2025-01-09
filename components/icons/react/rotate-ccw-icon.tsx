import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function RotateCcwIcon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<polyline points="1 4 1 10 7 10" />
			<path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
		</SvgIcon>
	);
}

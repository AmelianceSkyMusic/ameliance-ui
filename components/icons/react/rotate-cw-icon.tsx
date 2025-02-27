import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function RotateCwIcon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<polyline points="23 4 23 10 17 10" />
			<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
		</SvgIcon>
	);
}

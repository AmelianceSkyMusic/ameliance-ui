import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function CheckIcon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<polyline points="20 6 9 17 4 12" />
		</SvgIcon>
	);
}

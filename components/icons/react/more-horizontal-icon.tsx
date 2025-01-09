import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function MoreHorizontalIcon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<circle cx="12" cy="12" r="1" />
			<circle cx="19" cy="12" r="1" />
			<circle cx="5" cy="12" r="1" />
		</SvgIcon>
	);
}

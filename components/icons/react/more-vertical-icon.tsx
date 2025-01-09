import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function MoreVerticalIcon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<circle cx="12" cy="12" r="1" />
			<circle cx="12" cy="5" r="1" />
			<circle cx="12" cy="19" r="1" />
		</SvgIcon>
	);
}

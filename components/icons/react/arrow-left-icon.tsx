import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function ArrowLeftIcon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<line x1="19" y1="12" x2="5" y2="12" />
			<polyline points="12 19 5 12 12 5" />
		</SvgIcon>
	);
}

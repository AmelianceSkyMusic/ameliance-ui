import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function SearchIcon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<circle cx="11" cy="11" r="8" />
			<line x1="21" y1="21" x2="16.65" y2="16.65" />
		</SvgIcon>
	);
}

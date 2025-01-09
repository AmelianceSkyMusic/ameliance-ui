import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function ChevronRightIcon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}

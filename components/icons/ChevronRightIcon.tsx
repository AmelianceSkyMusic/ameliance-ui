import type { SvgIconProps } from '../SvgIcon';
import { SvgIcon } from '../SvgIcon';

export function ChevronRightIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}

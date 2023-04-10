import type { SvgIconProps } from '../SvgIcon';
import { SvgIcon } from '../SvgIcon';

export function ChevronLeftIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}

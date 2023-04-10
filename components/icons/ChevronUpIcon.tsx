import type { SvgIconProps } from '../SvgIcon';
import { SvgIcon } from '../SvgIcon';

export function ChevronUpIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<path d="M18 15L12 9L6 15" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}

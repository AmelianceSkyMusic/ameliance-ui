import type { SvgIconProps } from '../SvgIcon';
import { SvgIcon } from '../SvgIcon';

export function ChevronDownIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}

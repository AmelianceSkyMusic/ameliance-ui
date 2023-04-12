import type { SvgIconProps } from '../SvgIcon';
import { SvgIcon } from '../SvgIcon';

export function CountLineIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<path d="M17 19L19 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12 20V4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M6 19L7 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M2 8L22 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}

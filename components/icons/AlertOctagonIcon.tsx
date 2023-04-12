import type { SvgIconProps } from '../SvgIcon';
import { SvgIcon } from '../SvgIcon';

export function AlertOctagonIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<path d="M7.86 2H16.14L22 7.86V16.14L16.14 22H7.86L2 16.14V7.86L7.86 2Z" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12 8V12" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12 16H12.01" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}

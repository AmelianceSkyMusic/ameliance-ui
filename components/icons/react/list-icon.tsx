import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function ListIcon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<path d="M8 6H21" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M8 12H21" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M8 18H21" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M3 6H3.01" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M3 12H3.01" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M3 18H3.01" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}

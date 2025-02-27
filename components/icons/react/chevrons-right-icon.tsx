import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function ChevronsRightIcon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<path d="M13 17L18 12L13 7" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M6 17L11 12L6 7" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}

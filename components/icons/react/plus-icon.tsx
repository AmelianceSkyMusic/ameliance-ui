import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function PlusIcon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<path d="M12 5V19" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M5 12H19" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}

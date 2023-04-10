import type { SvgIconProps } from '../SvgIcon';
import { SvgIcon } from '../SvgIcon';

export function InfoIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<path d="M12.7165 22.7087C18.2394 22.7087 22.7165 18.2315 22.7165 12.7087C22.7165 7.18582 18.2394 2.70866 12.7165 2.70866C7.19367 2.70866 2.71652 7.18582 2.71652 12.7087C2.71652 18.2315 7.19367 22.7087 12.7165 22.7087Z" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12.7165 16.7087V12.7087" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12.7165 8.70866H12.7265" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}

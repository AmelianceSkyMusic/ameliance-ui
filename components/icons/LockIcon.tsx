import type { SvgIconProps } from '../SvgIcon';
import { SvgIcon } from '../SvgIcon';

export function LockIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<path d="M19.5524 11.8141H5.55243C4.44786 11.8141 3.55243 12.7095 3.55243 13.8141V20.8141C3.55243 21.9187 4.44786 22.8141 5.55243 22.8141H19.5524C20.657 22.8141 21.5524 21.9187 21.5524 20.8141V13.8141C21.5524 12.7095 20.657 11.8141 19.5524 11.8141Z" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M7.55243 11.8141V7.81412C7.55243 6.48803 8.07921 5.21627 9.0169 4.27858C9.95458 3.3409 11.2263 2.81412 12.5524 2.81412C13.8785 2.81412 15.1503 3.3409 16.088 4.27858C17.0256 5.21627 17.5524 6.48803 17.5524 7.81412V11.8141" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}

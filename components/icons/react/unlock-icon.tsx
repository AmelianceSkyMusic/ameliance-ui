import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function UnlockIcon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<path
				d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M7 11V7C6.99876 5.76005 7.45828 4.56387 8.28938 3.64367C9.12047 2.72347 10.2638 2.1449 11.4975 2.02029C12.7312 1.89568 13.9671 2.2339 14.9655 2.96931C15.9638 3.70472 16.6533 4.78485 16.9 6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</SvgIcon>
	);
}

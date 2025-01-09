import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function PaperclipIcon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<path
				d="M21.44 11.05L12.25 20.24C11.1241 21.3658 9.59717 21.9983 8.00498 21.9983C6.4128 21.9983 4.88583 21.3658 3.75998 20.24C2.63414 19.1142 2.00165 17.5872 2.00165 15.995C2.00165 14.4028 2.63414 12.8758 3.75998 11.75L12.95 2.56C13.7005 1.80944 14.7185 1.38778 15.78 1.38778C16.8414 1.38778 17.8594 1.80944 18.61 2.56C19.3605 3.31056 19.7822 4.32854 19.7822 5.39C19.7822 6.45146 19.3605 7.46944 18.61 8.22L9.40998 17.41C9.0347 17.7853 8.52571 17.9961 7.99498 17.9961C7.46426 17.9961 6.95527 17.7853 6.57998 17.41C6.2047 17.0347 5.99387 16.5257 5.99387 15.995C5.99387 15.4643 6.2047 14.9553 6.57998 14.58L15.07 6.1"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</SvgIcon>
	);
}

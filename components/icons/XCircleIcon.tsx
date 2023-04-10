import type { SvgIconProps } from '../SvgIcon';
import { SvgIcon } from '../SvgIcon';

export function XCircleIcon(props: SvgIconProps) {
	return (
		<SvgIcon
			fill="none"
			{...props}
		>
			<path d="M12.237 22.8758C17.7599 22.8758 22.237 18.3987 22.237 12.8758C22.237 7.35296 17.7599 2.87581 12.237 2.87581C6.71418 2.87581 2.23703 7.35296 2.23703 12.8758C2.23703 18.3987 6.71418 22.8758 12.237 22.8758Z" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M15.237 9.87581L9.23703 15.8758" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M9.23703 9.87581L15.237 15.8758" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}

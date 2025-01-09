import type { SvgIconProps } from '../../svg-icon';
import { SvgIcon } from '../../svg-icon';

export function AlertTriangleIcon(props: SvgIconProps) {
	return (
		<SvgIcon fill="none" {...props}>
			<path
				d="M10.29 3.86001L1.81999 18C1.64536 18.3024 1.55296 18.6453 1.55198 18.9945C1.551 19.3437 1.64148 19.6871 1.81442 19.9905C1.98735 20.2939 2.23672 20.5468 2.5377 20.7239C2.83868 20.901 3.18079 20.9962 3.52999 21H20.47C20.8192 20.9962 21.1613 20.901 21.4623 20.7239C21.7633 20.5468 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86001C13.5317 3.56611 13.2807 3.32313 12.9812 3.15449C12.6817 2.98585 12.3437 2.89726 12 2.89726C11.6563 2.89726 11.3183 2.98585 11.0188 3.15449C10.7193 3.32313 10.4683 3.56611 10.29 3.86001Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M12 9V13" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12 17H12.01" strokeLinecap="round" strokeLinejoin="round" />
		</SvgIcon>
	);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useMediaQuery } from 'react-responsive';

import { SCREEN_SIZES } from '../constants/SCREEN_SIZES';

interface UseScreenQueryReturn {
	isScreenXX: boolean;
	isScreenXL: boolean;
	isScreenLG: boolean;
	isScreenMD: boolean;
	isScreenSM: boolean;
	isScreenXS: boolean;
	isScreenSS: boolean;
}

/**
 * Returns a boolean variable corresponding to the screen resolution
 *
 * xx → max-width: Infinity (>1180px)
 *
 *	xl → max-width: 1179px (>1024px)
 *
 *	lg → max-width: 1023px (>768px)
 *
 *	md → max-width: 767px (>540px)
 *
 *	sm → max-width: 539px (>480px)
 *
 *	xs → max-width: 479px (>360px)
 *
 *	ss → max-width: 359px (>0px)
 */
export function useScreenQuery(): UseScreenQueryReturn {
	return {
		isScreenXX: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.xx}px)` }),
		isScreenXL: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.xl}px)` }),
		isScreenLG: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.lg}px)` }),
		isScreenMD: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.md}px)` }),
		isScreenSM: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.sm}px)` }),
		isScreenXS: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.xs}px)` }),
		isScreenSS: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.ss}px)` }),
	};
}

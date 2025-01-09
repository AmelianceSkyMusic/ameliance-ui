import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { IconElement, IconProps } from '../../../icon';
import { Icon } from '../../../icon';

import c from './x-circle-icon.module.scss';

export type XCircleIconElement = IconElement;

export type XCircleIconProps = IconProps;

export const XCircleIcon = forwardRef<XCircleIconElement, XCircleIconProps>(
	({ className, ...rest }, ref) => {
		return <Icon className={join(c.root, className)} ref={ref} {...rest} />;
	},
);

XCircleIcon.displayName = 'XCircleIcon';

import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { IconElement, IconProps } from '../../../icon';
import { Icon } from '../../../icon';

import c from './alert-triangle-icon.module.scss';

export type AlertTriangleIconElement = IconElement;

export type AlertTriangleIconProps = IconProps;

export const AlertTriangleIcon = forwardRef<AlertTriangleIconElement, AlertTriangleIconProps>(
	({ className, ...rest }, ref) => {
		return <Icon className={join(c.root, className)} ref={ref} {...rest} />;
	},
);

AlertTriangleIcon.displayName = 'AlertTriangleIcon';

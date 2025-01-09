import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { IconElement, IconProps } from '../../../icon';
import { Icon } from '../../../icon';

import c from './alert-circle-icon.module.scss';

export type AlertCircleIconElement = IconElement;

export type AlertCircleIconProps = IconProps;

export const AlertCircleIcon = forwardRef<AlertCircleIconElement, AlertCircleIconProps>(
	({ className, ...rest }, ref) => {
		return <Icon className={join(c.root, className)} ref={ref} {...rest} />;
	},
);

AlertCircleIcon.displayName = 'AlertCircleIcon';

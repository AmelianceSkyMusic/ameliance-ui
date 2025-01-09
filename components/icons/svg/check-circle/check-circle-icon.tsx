import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { IconElement, IconProps } from '../../../icon';
import { Icon } from '../../../icon';

import c from './check-circle-icon.module.scss';

export type CheckCircleIconElement = IconElement;

export type CheckCircleIconProps = IconProps;

export const CheckCircleIcon = forwardRef<CheckCircleIconElement, CheckCircleIconProps>(
	({ className, ...rest }, ref) => {
		return <Icon className={join(c.root, className)} ref={ref} {...rest} />;
	},
);

CheckCircleIcon.displayName = 'CheckCircleIcon';

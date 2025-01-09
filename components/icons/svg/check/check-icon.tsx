import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { IconElement, IconProps } from '../../../icon';
import { Icon } from '../../../icon';

import c from './check-icon.module.scss';

export type CheckIconElement = IconElement;

export type CheckIconProps = IconProps;

export const CheckIcon = forwardRef<CheckIconElement, CheckIconProps>(
	({ className, ...rest }, ref) => {
		return <Icon className={join(c.root, className)} ref={ref} {...rest} />;
	},
);

CheckIcon.displayName = 'CheckIcon';

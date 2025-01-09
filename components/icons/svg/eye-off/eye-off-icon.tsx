import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { IconElement, IconProps } from '../../../icon';
import { Icon } from '../../../icon';

import c from './eye-off-icon.module.scss';

export type EyeOffIconElement = IconElement;

export type EyeOffIconProps = IconProps;

export const EyeOffIcon = forwardRef<EyeOffIconElement, EyeOffIconProps>(
	({ className, ...rest }, ref) => {
		return <Icon className={join(c.root, className)} ref={ref} {...rest} />;
	},
);

EyeOffIcon.displayName = 'EyeOffIcon';

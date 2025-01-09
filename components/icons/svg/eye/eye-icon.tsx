import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { IconElement, IconProps } from '../../../icon';
import { Icon } from '../../../icon';

import c from './eye-icon.module.scss';

export type EyeIconElement = IconElement;

export type EyeIconProps = IconProps;

export const EyeIcon = forwardRef<EyeIconElement, EyeIconProps>(({ className, ...rest }, ref) => {
	return <Icon className={join(c.root, className)} ref={ref} {...rest} />;
});

EyeIcon.displayName = 'EyeIcon';

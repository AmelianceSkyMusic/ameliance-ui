import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { IconElement, IconProps } from '../../../icon';
import { Icon } from '../../../icon';

import c from './moon-icon.module.scss';

export type MoonIconElement = IconElement;

export type MoonIconProps = IconProps;

export const MoonIcon = forwardRef<MoonIconElement, MoonIconProps>(
	({ className, ...rest }, ref) => {
		return <Icon className={join(c.root, className)} ref={ref} {...rest} />;
	},
);

MoonIcon.displayName = 'MoonIcon';

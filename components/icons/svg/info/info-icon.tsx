import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { IconElement, IconProps } from '../../../icon';
import { Icon } from '../../../icon';

import c from './info-icon.module.scss';

export type InfoIconElement = IconElement;

export type InfoIconProps = IconProps;

export const InfoIcon = forwardRef<InfoIconElement, InfoIconProps>(
	({ className, ...rest }, ref) => {
		return <Icon className={join(c.root, className)} ref={ref} {...rest} />;
	},
);

InfoIcon.displayName = 'InfoIcon';

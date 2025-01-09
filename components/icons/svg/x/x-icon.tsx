import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { IconElement, IconProps } from '../../../icon';
import { Icon } from '../../../icon';

import c from './x-icon.module.scss';

export type XIconElement = IconElement;

export type XIconProps = IconProps;

export const XIcon = forwardRef<XIconElement, XIconProps>(({ className, ...rest }, ref) => {
	return <Icon className={join(c.root, className)} ref={ref} {...rest} />;
});

XIcon.displayName = 'XIcon';

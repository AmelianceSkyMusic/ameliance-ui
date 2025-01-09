import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { IconElement, IconProps } from '../../../icon';
import { Icon } from '../../../icon';

import c from './calendar-icon.module.scss';

export type CalendarIconElement = IconElement;

export type CalendarIconProps = IconProps;

export const CalendarIcon = forwardRef<CalendarIconElement, CalendarIconProps>(
	({ className, ...rest }, ref) => {
		return <Icon className={join(c.root, className)} ref={ref} {...rest} />;
	},
);

CalendarIcon.displayName = 'CalendarIcon';

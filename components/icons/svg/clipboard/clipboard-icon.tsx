import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import type { IconElement, IconProps } from '../../../icon';
import { Icon } from '../../../icon';

import c from './clipboard-icon.module.scss';

export type ClipboardIconElement = IconElement;

export type ClipboardIconProps = IconProps;

export const ClipboardIcon = forwardRef<ClipboardIconElement, ClipboardIconProps>(
	({ className, ...rest }, ref) => {
		return <Icon className={join(c.root, className)} ref={ref} {...rest} />;
	},
);

ClipboardIcon.displayName = 'ClipboardIcon';

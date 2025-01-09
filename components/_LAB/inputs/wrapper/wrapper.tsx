import { forwardRef } from 'react';

import { join } from 'ameliance-scripts';

import { Block } from '../../../blocks/block';
import { Typography } from '../../../typography';

import c from './wrapper.module.scss';

export type WrapperElement = HTMLDivElement;

export type WrapperCommonProps = {
	label?: string;
	required?: boolean;
	showError?: boolean;
};

export type WrapperProps = React.ComponentPropsWithoutRef<'div'> &
	WrapperCommonProps & {
		error?: string;
	};

export const Wrapper = forwardRef<WrapperElement, WrapperProps>(
	({ label, required, error, className, showError, children, ...rest }, ref) => {
		const containerClass = [error && showError && c.error];

		return (
			<Block className={join(c.root, containerClass, className)} ref={ref} {...rest}>
				{(label || required) && (
					<Typography component="h5" className={c.label}>
						{label}
						{required && (
							<Typography component="p1" className={c.asterisk}>
								*
							</Typography>
						)}
					</Typography>
				)}
				<Block className={c.inputBlockContainer}>
					{children}
					{showError && (
						<Typography component="subtitle1" className={c.error}>
							{error}
						</Typography>
					)}
				</Block>
			</Block>
		);
	},
);

Wrapper.displayName = 'Wrapper';

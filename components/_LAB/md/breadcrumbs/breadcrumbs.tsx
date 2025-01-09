'use client';

import React from 'react';

import NextLink from 'next/link';

import { Nav } from '../../../blocks';
import { List, ListItem } from '../../../list';
import { Typography } from '../../../typography';
import { Link } from '../link';

import c from './breadcrumbs.module.scss';

type BreadcrumbsProps = {
	crumbs: Record<string, string>[];
	showLastSeparator?: boolean;
};

export function Breadcrumbs({ crumbs, showLastSeparator = true }: BreadcrumbsProps) {
	return (
		<Nav>
			<List variant="plain" className={c.crumbs}>
				{crumbs.map((crumb, index) => {
					return (
						<ListItem className={c.crumb} key={index}>
							<Link component={NextLink} href={crumb.slug} underline={false}>
								{crumb.title}
							</Link>
							<Typography>
								{showLastSeparator ? '/' : index < crumbs.length - 1 && '/'}
							</Typography>
						</ListItem>
					);
				})}
			</List>
		</Nav>
	);
}

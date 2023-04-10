import asm from 'asm-ts-scripts';

import type { Grid } from '../types/Grid';

export function getGridClass(grid: Grid) {
	const grinColumnSize = grid?.size === 10 ? 'col10' : 'col';

	const gridClass = asm.join([
		grid?.xx && `${grinColumnSize}-xx-${grid.xx}`,
		grid?.xl && `${grinColumnSize}-xl-${grid.xl}`,
		grid?.lg && `${grinColumnSize}-lg-${grid.lg}`,
		grid?.md && `${grinColumnSize}-md-${grid.md}`,
		grid?.sm && `${grinColumnSize}-sm-${grid.sm}`,
		grid?.xs && `${grinColumnSize}-xs-${grid.xs}`,
		grid?.ss && `${grinColumnSize}-ss-${grid.ss}`,
	]);

	// same as above
	// const columns = ['xx', 'xl', 'lg', 'md', 'sm', 'xs', 'ss'];
	// const gridClassTest = columns.reduce((result, s) => [
	// 	...result, grid?.[s as keyof Grid] && `${grinColumnSize}-${s}-${grid[s as keyof Grid]}`,
	// ], [] as (string | undefined)[]).filter((item) => typeof item === 'string' && item !== '').join(' ').trim();

	return gridClass;
}

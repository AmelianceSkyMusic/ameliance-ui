type GridSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface Grid {
	size?: 12 | 10;
	xx?: GridSizes;
	xl?: GridSizes;
	lg?: GridSizes;
	md?: GridSizes;
	sm?: GridSizes;
	xs?: GridSizes;
	ss?: GridSizes;
}

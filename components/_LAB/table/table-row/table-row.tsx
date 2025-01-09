import { join } from 'ameliance-scripts';

import type { ReactHTMLElementAttributes } from '../../../types/react-html-element-attributes';
import { Typography } from '../../../typography';
import type { Column } from '../table';

import c from './table-row.module.scss';

export type RowCellData<T> = {
	rowAllValues: T;
	rowCell?: RowCell<T>;
};

export type RowCell<T> = {
	value: T[keyof T];
} & Pick<Column<T>, 'key' | 'cell' | 'width'>;

type Row<T> = {
	rowAllValues: T;
	cells: RowCell<T>[];
};

export type TableRowElement = HTMLTableRowElement;

export type TableRowProps<T> = {
	row: Row<T>;
} & ReactHTMLElementAttributes<TableRowElement>;

export function TableRow<T>({ row, className, ...rest }: TableRowProps<T>) {
	return (
		<tr className={join(c.root, className)} {...rest}>
			{row.cells.map((rowCell) => {
				let styleSize;
				if (typeof rowCell.width === 'string') styleSize = { width: rowCell.width };
				if (typeof rowCell.width === 'number') styleSize = { flex: rowCell.width };
				return (
					<td className={c.cell} key={rowCell.key} style={styleSize || { flex: 1 }}>
						{rowCell.cell ? (
							typeof rowCell.cell === 'string' ? (
								<Typography>{rowCell.cell}</Typography>
							) : (
								typeof rowCell.cell === 'function' &&
								rowCell.cell({ rowCell, rowAllValues: row.rowAllValues })
							)
						) : (
							(typeof rowCell.value === 'string' || typeof rowCell.value === 'number') && (
								<Typography>{rowCell.value}</Typography>
							)
						)}
					</td>
				);
			})}
		</tr>
	);
}

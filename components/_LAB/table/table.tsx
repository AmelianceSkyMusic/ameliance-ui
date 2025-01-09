import { join } from 'ameliance-scripts';

import type { ReactHTMLElementAttributes } from '../../types/react-html-element-attributes';
import { TableHeader } from './table-header/table-header';
import type { RowCellData } from './table-row/table-row';
import { TableRow } from './table-row/table-row';

import c from './table.module.scss';

export type Column<T> = {
	key: string | number;
	header?: string | ((key: string | number) => React.ReactElement);
	cell?: string | ((row: RowCellData<T>) => React.ReactElement);
	width?: string | number;
};

export type TableElement = HTMLTableElement;

export type TableProps<T> = {
	columns: Column<T>[];
	data: T[];
	header?: boolean;
} & ReactHTMLElementAttributes<TableElement>;

export function Table<T>({ columns, data, header = true, className, ...rest }: TableProps<T>) {
	const headerData = columns.map((column) => ({
		key: column.key,
		header: column.header,
		width: column.width,
	}));

	const body = data.map((dataElement) => {
		const values =
			dataElement !== null && typeof dataElement === 'object'
				? Object.values(dataElement).join()
				: '';
		return {
			index: values,
			rowAllValues: dataElement,
			cells: columns.map((column) => ({
				key: column.key,
				cell: column.cell,
				width: column.width,
				value: dataElement[column.key as keyof T],
			})),
		};
	});
	return (
		<table className={join(c.root, 'scroll', className)} {...rest}>
			{header && <TableHeader header={headerData} />}
			<tbody className={c.body}>
				{body.map((bodyRow) => {
					return (
						<TableRow
							key={bodyRow.index}
							row={{
								rowAllValues: bodyRow.rowAllValues,
								cells: bodyRow.cells,
							}}
						/>
					);
				})}
			</tbody>
		</table>
	);
}

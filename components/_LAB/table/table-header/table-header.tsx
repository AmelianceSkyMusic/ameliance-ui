import { join } from 'ameliance-scripts';

import type { ReactHTMLElementAttributes } from '../../../types/react-html-element-attributes';
import { Typography } from '../../../typography';
import type { Column } from '../table';

import c from './table-header.module.scss';

type Header<T> = Pick<Column<T>, 'key' | 'header' | 'width'>;

export type TableHeaderElement = HTMLTableSectionElement;

export type TableHeaderProps<T> = {
	header: Header<T>[];
} & ReactHTMLElementAttributes<TableHeaderElement>;

export function TableHeader<T>({ header, className, ...rest }: TableHeaderProps<T>) {
	return (
		<thead className={join(c.root, className)} {...rest}>
			<tr className={c.row}>
				{header.map((column) => {
					let styleSize;
					if (typeof column.width === 'string') styleSize = { width: column.width };
					if (typeof column.width === 'number') styleSize = { flex: column.width };
					return (
						<th className={c.cell} key={column.key} style={styleSize || { flex: 1 }}>
							{typeof column.header === 'string' && (
								<Typography component="h5">{column.header}</Typography>
							)}
							{typeof column.header === 'function' && column.header(column.key)}
						</th>
					);
				})}
			</tr>
		</thead>
	);
}

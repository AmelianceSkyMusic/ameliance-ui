import { join } from 'ameliance-scripts/scripts/join';
import type { Column } from '../table';

import c from './table-header.module.css';

type Header<T> = Pick<Column<T>, 'key' | 'header' | 'width'>;

export type TableHeaderElement = HTMLTableSectionElement;

export interface TableHeaderProps<T> extends ReactHTMLElementAttributes<TableHeaderElement> {
   header: Header<T>[];
}

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
                     {typeof column.header === 'string' && <h6>{column.header}</h6>}
                     {typeof column.header === 'function' && column.header(column.key)}
                  </th>
               );
            })}
         </tr>
      </thead>
   );
}

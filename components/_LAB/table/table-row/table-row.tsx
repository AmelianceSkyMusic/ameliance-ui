import { join } from 'ameliance-scripts/scripts/join';
import type { Column } from '../table';

import c from './table-row.module.css';

export interface RowCellData<T> {
   rowAllValues: T;
   rowCell?: RowCell<T>;
}

export interface RowCell<T> extends Pick<Column<T>, 'key' | 'cell' | 'width'> {
   value: T[keyof T];
}

interface Row<T> {
   rowAllValues: T;
   cells: RowCell<T>[];
}

export type TableRowElement = HTMLTableRowElement;

export interface TableRowProps<T> extends ReactHTMLElementAttributes<TableRowElement> {
   row: Row<T>;
}

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
                        <p>{rowCell.cell}</p>
                     ) : (
                        typeof rowCell.cell === 'function' &&
                        rowCell.cell({ rowCell, rowAllValues: row.rowAllValues })
                     )
                  ) : (
                     (typeof rowCell.value === 'string' || typeof rowCell.value === 'number') && (
                        <p>{rowCell.value}</p>
                     )
                  )}
               </td>
            );
         })}
      </tr>
   );
}

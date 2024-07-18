import { TableHeader } from './table-header/table-header';
import type { RowCellData } from './table-row/table-row';
import { TableRow } from './table-row/table-row';

import c from './table.module.scss';

import { join } from 'ameliance-scripts/scripts/join';

export interface Column<T> {
   key: string | number;
   header?: string | ((key: string | number) => React.ReactElement);
   cell?: string | ((row: RowCellData<T>) => React.ReactElement);
   width?: string | number;
}

export type TableElement = HTMLTableElement;

export interface TableProps<T> extends ReactHTMLElementAttributes<TableElement> {
   columns: Column<T>[];
   data: T[];
}

export function Table<T>({ columns, data, className, ...rest }: TableProps<T>) {
   const header = columns.map((column) => ({
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
         <TableHeader header={header} />
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

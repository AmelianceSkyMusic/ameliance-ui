'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { join, writeTextToClipboard } from 'ameliance-scripts';

import { mergeRefs } from '~/submodules/ameliance-ui/helpers/merge-refs';

import { Button } from '../../../button';
import { ClipboardIcon } from '../../../icons/svg/clipboard';
import { useSnack } from '../../../snackbar/use-snack';

import c from './table.module.scss';

export type TableElement = HTMLTableElement;

export type TableProps = React.ComponentPropsWithoutRef<'table'>;

export const Table = forwardRef<TableElement, TableProps>(
	({ children, className, ...rest }, ref) => {
		const tableRef = useRef<TableElement>(null);
		const [hoveredCell, setHoveredCell] = useState<HTMLElement | null>(null);
		const [hoveredRow, setHoveredRow] = useState<HTMLTableRowElement | null>(null);
		const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

		const { addSnack } = useSnack();
		const writeToClipboard = async (text: string) => {
			const isCopied = await writeTextToClipboard(text);
			if (isCopied) {
				addSnack({
					title: 'Скопійовано:',
					message: text,
				});
			} else {
				addSnack({
					type: 'error',
					message: 'Не вдалося скопіювати. Напишіть мені в Телеграм!',
				});
			}
		};

		useEffect(() => {
			const table = tableRef.current;
			if (!table) return;

			const rows = table.querySelectorAll('tr');

			rows.forEach((row) => {
				const htmlRow = row as HTMLTableRowElement;

				htmlRow.addEventListener('mouseenter', () => {
					setHoveredRow(htmlRow);
				});

				htmlRow.addEventListener('mouseleave', () => {
					setHoveredRow(null);
				});
			});

			const cells = table.querySelectorAll('td, th');

			cells.forEach((cell) => {
				const htmlCell = cell as HTMLElement;

				htmlCell.addEventListener('mouseenter', () => {
					const cellIndex = htmlCell.parentElement
						? Array.from(htmlCell.parentElement.children).indexOf(htmlCell)
						: null;
					setHoveredColumn(cellIndex);
					setHoveredCell(htmlCell);
				});

				htmlCell.addEventListener('mouseleave', () => {
					setHoveredColumn(null);
					setHoveredCell(null);
				});
			});

			return () => {
				rows.forEach((row) => {
					const htmlRow = row as HTMLTableRowElement;
					htmlRow.removeEventListener('mouseenter', () => {});
					htmlRow.removeEventListener('mouseleave', () => {});
				});

				cells.forEach((cell) => {
					cell.removeEventListener('mouseenter', () => {});
					cell.removeEventListener('mouseleave', () => {});
				});
			};
		}, []);

		const handleCellCopyIconOnClick = async (cell: HTMLElement) => {
			const textContent = cell.textContent?.trim() || '';
			if (!textContent) return;
			await writeToClipboard(textContent);
		};
		const handleRowCopyIconOnClick = async (row: HTMLTableRowElement) => {
			const rowText = Array.from(row.cells)
				.map((cell) => cell.textContent?.trim() || '')
				.join(' | ');
			const preparedText = `| ${rowText} |`;
			if (!preparedText) return;
			await writeToClipboard(preparedText);
		};

		const handleColumnCopyIconOnClick = async (columnIndex: number) => {
			if (!tableRef.current) return;

			const headerCell = tableRef.current.querySelector(
				`thead th:nth-child(${columnIndex + 1})`,
			);
			const rows = tableRef.current.querySelectorAll('tbody tr');
			const columnText = Array.from(rows)
				.map((row) => {
					const rowHtml = row as HTMLTableRowElement;
					const cell = rowHtml.cells[columnIndex];
					return cell ? cell.textContent?.trim() || '' : '';
				})
				.join('\n');
			const headerText = headerCell ? headerCell.textContent?.trim() : '';
			const preparedText = `${headerText}\n${columnText}`;
			if (!preparedText) return;
			await writeToClipboard(preparedText);
		};

		const renderIcon = (cell: HTMLElement) => {
			return ReactDOM.createPortal(
				<Button
					size="tiny"
					type="text"
					className={c.cellCopyIcon}
					onClick={() => handleCellCopyIconOnClick(cell)}
				>
					<ClipboardIcon size="xs" />
				</Button>,
				cell,
			);
		};
		const renderRowIcon = (row: HTMLTableRowElement) => {
			const rowCell = row.querySelector('td:last-child') || row.querySelector('th:last-child');
			if (!rowCell) return;

			return ReactDOM.createPortal(
				<Button
					size="tiny"
					type="text"
					className={c.rowCopyIcon}
					onClick={() => handleRowCopyIconOnClick(row)}
				>
					<ClipboardIcon size="xs" />
				</Button>,
				rowCell,
			);
		};

		const renderColumnIcon = (columnIndex: number) => {
			const lastRow = tableRef.current?.querySelector(
				'tbody tr:last-child',
			) as HTMLTableRowElement;
			const lastCell = lastRow.cells[columnIndex];
			if (!lastCell) return;

			return ReactDOM.createPortal(
				<Button
					size="tiny"
					type="text"
					className={c.columnCopyIcon}
					onClick={() => handleColumnCopyIconOnClick(columnIndex)}
				>
					<ClipboardIcon size="xs" />
				</Button>,
				lastCell,
			);
		};

		return (
			<>
				<table className={join(c.root, className)} ref={mergeRefs([tableRef, ref])} {...rest}>
					{children}
				</table>
				{hoveredCell && renderIcon(hoveredCell)}
				{hoveredRow && renderRowIcon(hoveredRow)}
				{hoveredColumn !== null && renderColumnIcon(hoveredColumn)}
			</>
		);
	},
);

Table.displayName = 'Table';

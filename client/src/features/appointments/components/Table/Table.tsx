import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import styles from './Table.module.scss';
import { FaClock, FaRegUserCircle } from "react-icons/fa";
import { MdCalendarMonth, MdOutlineStickyNote2 } from "react-icons/md";
import { GiHomeGarage } from "react-icons/gi";
import { Appointment } from "../../../../types";

const columnHelper = createColumnHelper<Appointment>();

const columns = [
    columnHelper.accessor('time', {
        header: () => (
            <div className={styles.flex}>
                <FaClock />
                Time
            </div>
        ),
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor('date', {
        header: () => (
            <div className={styles.flex}>
                <MdCalendarMonth />
                Date
            </div>
        ),
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor('customer', {
        header: () => (
            <div className={styles.flex}>
                <FaRegUserCircle />
                Customer
            </div>
        ),
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor('serviceProvider', {
        header: () => (
            <div className={styles.flex}>
                <GiHomeGarage />
                Service Provider
            </div>
        ),
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor('note', {
        header: () => (
            <div className={styles.flex}>
                <MdOutlineStickyNote2 />
                Note
            </div>
        ),
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor('status', {
        header: () => (
            <div className={styles.flex}>
                Status
            </div>
        ),
        cell: (info) => info.getValue()
    }),
];

export default function Table({ appointments }: { appointments: Appointment[] }) {
    const table = useReactTable({
        data: appointments,
        columns,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table className={styles.table}>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} className={styles.headRow}>
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className={styles.bodyRow}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

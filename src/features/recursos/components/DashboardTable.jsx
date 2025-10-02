import { useState } from "react";
import {
    useReactTable, 
    getCoreRowModel,
    flexRender
} from '@tanstack/react-table'

//"en_proceso": 1,
//"aprobado": 0,
//"total_at": 1,
//"vigente": 0,

function DashboardTable({asistenciasdetalles={}}) {
    const columns = [
        {
            header: "ID",
            accessorKey: 'id',
            footer: 'TOTAL'
        },
        {
            header: () => <span>AÑO</span>,
            accessorKey: 'periodo',
            //footer: 'PERIODO'
        },
        {
            header: "EN PROCESO",
            accessorKey: 'en_proceso',
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('en_proceso'), 0),
        },
        {
            header: "APROBADO",
            accessorKey: 'aprobado',
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('aprobado'), 0),
        },
    ]
    //const [data] = useState(() => [...asistenciasdetalles]);
    const table = useReactTable({
        data: asistenciasdetalles, 
        columns: columns, 
        getCoreRowModel: getCoreRowModel(),
    })
  return (
    <>
    <div className="max-w-5xl p-2 mx-auto fill-gray-400">
        <table className="w-full text-left border border-spacing-2 border-slate-400">
            <thead className="bg-gray-500">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="capitalize px-3.5 py-2 border border-slate-300">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="py-10 border-b border-gray-200 hover:bg-gray-200">
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-4 border border-slate-300">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                    </tr>
                ))
                ) : (
                <tr className="h-32 text-center">
                  <td colSpan={12}>Registros no encontrados...</td>
                </tr>
                )}
            </tbody>
            <tfoot>
                {table.getFooterGroups().map(footerGroup => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map(footer => (
                            <th key={footer.id} className="capitalize px-3.5 py-2 border border-slate-300">
                                {flexRender(footer.column.columnDef.footer, footer.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>
    </div>
    </>
  )
}

export default DashboardTable
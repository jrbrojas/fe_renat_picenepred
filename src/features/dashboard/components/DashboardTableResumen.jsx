import { ClipLoader } from "react-spinners";
import {
    useReactTable, 
    getCoreRowModel,
    flexRender
} from '@tanstack/react-table'

const DashboardTableResumen =({asistenciasdetalles={},loading}) => {
    const columns = [
   /*     {
            header: "ID",
            accessorKey: 'id',
            footer: 'Id'
        },*/
        {
            header: "PERIODO",
            accessorKey: 'annio',
            footer: 'TOTALES'
        },
        {
            header: "BASICOS",
            accessorKey: 'formacion_basica',
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('formacion_basica'), 0)
        },
        {
            header: "ESPECIALIZADOS",
            accessorKey: 'formacion_especializada',
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('formacion_especializada'), 0)
        },
        {
            header: "ACREDITACION",
            accessorKey: 'evaluadores',
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('evaluadores'), 0)
        },
        {
            header: "PPRRD VIGENTES",
            accessorKey: 'pprrd',
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('pprrd'), 0)
        },
        {
            header: "EVAR",
            accessorKey: 'evar',
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('evar'), 0)
        },
        
    ]
    //const [data] = useState(() => [...asistenciasdetalles]);
    const table = useReactTable({
        data: asistenciasdetalles, 
        columns: columns, 
        getCoreRowModel: getCoreRowModel(),
    })
  return (


    <div className="max-w-5xl p-2 mx-auto fill-gray-400">
        <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}  style={{ backgroundColor: "rgb(0 131 155 / var(--tw-bg-opacity))", color: "white" }}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="capitalize px-3.5 py-2 border border-slate-300">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            {loading ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                <ClipLoader color="#8884d8" size={45} />
                <p>Cargando datos...</p>
              </td>
            </tr>
          ) : (
            <>
           <tbody>
                {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="py-10 border-b border-gray-200 hover:bg-gray-100">
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="border border-slate-300 text-center">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                    </tr>
                ))
                ) : (
                <tr className="h-32 text-center">
                  <td colSpan={12}>No se encontraron registros</td>
                </tr>
                )}

            </tbody>
            <tfoot>
                {table.getFooterGroups().map(footerGroup => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map(footer => (
                            <th key={footer.id} className="border border-slate-400">
                                {flexRender(footer.column.columnDef.footer, footer.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </tfoot>
            </>)}
        </table>
    </div>
  )

}

export default DashboardTableResumen
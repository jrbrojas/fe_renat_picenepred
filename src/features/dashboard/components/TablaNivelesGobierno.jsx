import { useState,useEffect } from "react"
import {useReactTable, getCoreRowModel, flexRender} from '@tanstack/react-table'
import axiosClient from "../../../axios-client";


const TablaNivelesGobierno = () => {

  const [data, setData] = useState([]);


useEffect(() => {

  const getResumen = async () =>{
    try {
        await axiosClient.get('/niveles_gobierno')
            .then(({data}) => {
                setData(data.data);
        })
        
    } catch (error) {
        setError(error.message); 
    } finally {
     
    }
  }
  getResumen();

}, []);



    const columns = [
   /*     {
            header: "ID",
            accessorKey: 'id',
            footer: 'Id'
        },*/
        {
            header: "DEPARTAMENTO",
            accessorKey: 'dpto',
            footer: 'TOTALES'
        },
        {
            header: "NACIONAL",
            accessorKey: 'nacional',
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('nacional'), 0)
        },
        {
            header: "REGIONAL",
            accessorKey: 'regional',
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('regional'), 0)
        },
        {
            header: "PROVINCIAL",
            accessorKey: 'provincial',
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('provincial'), 0)
        },
        {
            header: "DISTRITAL",
            accessorKey: 'distrital',
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('distrital'), 0)
        },
        {
            header: "TOTAL",
            accessorKey: 'total',
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('total'), 0)
        },
        
    ]
    //const [data] = useState(() => [...asistenciasdetalles]);
    const table = useReactTable({
        data: data, 
        columns: columns, 
        getCoreRowModel: getCoreRowModel(),
    })
  return (
    <div className="max-w-5xl p-2 mx-auto fill-gray-400">
        <table className="w-full border-collapse border border-gray-300 rounded-2xl">
            <thead className="bg-gray-200">
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
                            <th key={footer.id} className="border border-slate-400 bg-gray-300">
                                {flexRender(footer.column.columnDef.footer, footer.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>
    </div>
  )
}

export default TablaNivelesGobierno
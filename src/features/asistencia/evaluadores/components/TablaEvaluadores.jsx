import { ClipLoader } from "react-spinners";
import {useState,useEffect} from 'react';
import {useReactTable, getCoreRowModel,flexRender} from '@tanstack/react-table';
import axiosClient from "../../../../axios-client";


const TablaEvaluadores = () =>{


 const [resumen, setResumen] = useState([]); 
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
    const getResumen = async () =>{
        try {
          setLoading(true);
            await axiosClient.get('/evaluadores_evar/')
                .then((response) => {
                    setResumen(response.data.data);
                    setLoading(false);
            })
            
        } catch (error) {
            setError(error.message); 
        } finally {
         
        }
      }
    
      getResumen();
    }, [])

    const columns = [
   /*     {
            header: "ID",
            accessorKey: 'id',
            footer: 'Id'
        },*/
        {
            header: "DEPARTAMENTO",
            accessorKey: 'name',
            footer: 'TOTALES'
        },
        {
            header: "EVALUADORES",
            accessorKey: 'count',
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('count'), 0)
        },
        ,
        
    ]
    //const [data] = useState(() => [...asistenciasdetalles]);
    const table = useReactTable({
        data: resumen, 
        columns: columns, 
        getCoreRowModel: getCoreRowModel(),
    })
  return (
    loading ? (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <ClipLoader color="#8884d8" size={40} />
          <p>Cargando datos...</p>
        </div>
      ) : (
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
)
}

export default TablaEvaluadores;
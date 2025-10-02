import { ClipLoader } from "react-spinners";
import {useState,useEffect} from 'react';
import { useResumen } from "../../../../hooks/useResumen";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {
    useReactTable, 
    getCoreRowModel,
    flexRender
} from '@tanstack/react-table'
import axiosClient from "../../../../axios-client";
import { useQuery } from "react-query";


const getResumen = async (u,i) => {
    const {data} = await axiosClient.get(`/periodos_pprrd_inicio/${u}`);
            return data;
    } 

const DashboardTableResumen_av =({ubigeo}) => {

const { data:dr,isLoading: isLoadingConteo } = useResumen(ubigeo, 'fortalecimiento_conteo');
if(!isLoadingConteo){
    var total_basico=dr.data[0].basica
    var total_especializada=dr.data[0].espcializada
    var total=dr.data[0].total
 
}

  const {data:d,error,isLoading} = useQuery(["tabla_resumen_av"+ubigeo], () => getResumen(ubigeo));


    const columns = [
   /*     {
            header: "ID",
            accessorKey: 'id',
            footer: 'Id'
        },*/
        {
            header: "PERIODO",
            accessorKey: 'periodo',
            footer: 'TOTALES'
        },
        {
            header: "FORMACIÓN BASICA",
            accessorKey: 'formacion_basica',
            //footer:total_basico
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('formacion_basica'), 0)
            //footer: ({ table }) => 12, 0)
        },
        {
            header: "FORMACIÓN EPECIALIZADA",
            accessorKey: 'formacion_especializada',
            //footer:total_especializada
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('formacion_especializada'), 0)
        },
        {
            header: "TOTAL",
            accessorKey: 'totales_formacion',
            footer:total
           //  footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('total'), 0)
        },
        
    ]
    //const [data] = useState(() => [...asistenciasdetalles]);
    const table = useReactTable({
        data: d, 
        columns: columns, 
        getCoreRowModel: getCoreRowModel(),
    })

    
 


  return (
    isLoading ? (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <ClipLoader color="#8884d8" size={40} />
          <p>Cargando datos...</p>
        </div>
      ) : (

    <div className="max-w-5xl p-2 mx-auto fill-gray-400">

<div className="btn-excel-cenepred" style={{display:'flex',width:'75px'}}>
            <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="1" fill-rule="evenodd" clip-rule="evenodd" d="M3 14.25C3.41421 14.25 3.75 14.5858 3.75 15C3.75 16.4354 3.75159 17.4365 3.85315 18.1919C3.9518 18.9257 4.13225 19.3142 4.40901 19.591C4.68577 19.8678 5.07435 20.0482 5.80812 20.1469C6.56347 20.2484 7.56459 20.25 9 20.25H15C16.4354 20.25 17.4365 20.2484 18.1919 20.1469C18.9257 20.0482 19.3142 19.8678 19.591 19.591C19.8678 19.3142 20.0482 18.9257 20.1469 18.1919C20.2484 17.4365 20.25 16.4354 20.25 15C20.25 14.5858 20.5858 14.25 21 14.25C21.4142 14.25 21.75 14.5858 21.75 15V15.0549C21.75 16.4225 21.75 17.5248 21.6335 18.3918C21.5125 19.2919 21.2536 20.0497 20.6517 20.6516C20.0497 21.2536 19.2919 21.5125 18.3918 21.6335C17.5248 21.75 16.4225 21.75 15.0549 21.75H8.94513C7.57754 21.75 6.47522 21.75 5.60825 21.6335C4.70814 21.5125 3.95027 21.2536 3.34835 20.6517C2.74643 20.0497 2.48754 19.2919 2.36652 18.3918C2.24996 17.5248 2.24998 16.4225 2.25 15.0549C2.25 15.0366 2.25 15.0183 2.25 15C2.25 14.5858 2.58579 14.25 3 14.25Z" fill="#FFFFFF"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 16.75C12.2106 16.75 12.4114 16.6615 12.5535 16.5061L16.5535 12.1311C16.833 11.8254 16.8118 11.351 16.5061 11.0715C16.2004 10.792 15.726 10.8132 15.4465 11.1189L12.75 14.0682V3C12.75 2.58579 12.4142 2.25 12 2.25C11.5858 2.25 11.25 2.58579 11.25 3V14.0682L8.55353 11.1189C8.27403 10.8132 7.79963 10.792 7.49393 11.0715C7.18823 11.351 7.16698 11.8254 7.44648 12.1311L11.4465 16.5061C11.5886 16.6615 11.7894 16.75 12 16.75Z" fill="#FFFFFF"/>
    </svg>
    
    
              <ReactHTMLTableToExcel
              id="botonExportar"
              className="texto-boton"
              table="periodos_capacitados"
              filename="periodos_capacitados"
              sheet="Resumen"
              buttonText="Excel"
              />  
              
        </div>

         
        <table id="periodos_capacitados" className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="cabecera-cenepred">
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="capitalize px-3.5 py-2 border border-slate-300">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
           <tbody>
                {
                
                table.getRowModel().rows.length ? (
                table.getRowModel().rows
                .filter(row => row.getVisibleCells().some(cell => {
                    const value = cell.getValue();
                    const columnId = cell.column.id;
                    return value !== '2016' ; // Considera también strings
                  })).
                map((row) => (
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
            
        </table>
    </div>
  )
)
}

export default DashboardTableResumen_av;
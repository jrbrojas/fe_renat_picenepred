import {
    useReactTable, 
    getCoreRowModel,
    flexRender
} from '@tanstack/react-table'

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
            header: "PPRRD",
            accessorKey: 'pprrd',
            //footer: 'PPRRD'
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('pprrd'), 0),
        },
        {
            header: "PPRRD Vigentes Acumulados",
            accessorKey: 'pprrd_acumulado',
            //footer: 'PPRRD'
            //footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('pprrd'), 0),
        },
        {
            header: "EVAR",
            accessorKey: 'evar',
            //footer: 'EVAR'
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('evar'), 0),
        },
        {
            header: "OTROS",
            accessorKey: 'otros',
            //footer: 'OTROS'
            footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('otros'), 0),
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

    {/* <div className="items-center w-full px-4 py-4 mx-auto my-10 border-2 rounded-lg shadow-md bg-base-200/50">
        <div className="container mx-auto">
            <div className="flex justify-between w-full px-4 py-2">
            <div className="text-lg font-bold">
            Instrumentos aprobados
            </div>
            <div className="px-2 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
            </div>
            </div>
            <div className="mt-6 overflow-x-auto">
                <table className="w-full border border-collapse table-auto">
                    <thead className="">
                        <tr className="text-base font-bold text-left bg-gray-50">
                        <th className="px-4 py-3 border-b-2 border-blue-500">Customer</th>
                        <th className="px-4 py-3 border-b-2 border-green-500">Contact</th>
                        <th className="px-4 py-3 border-b-2 border-red-500">Order No</th>
                        <th className="px-4 py-3 text-center border-b-2 border-yellow-500 sm:text-left">Purchased On</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-normal text-gray-700">
                        <tr className="py-10 border-b border-gray-200 hover:bg-gray-100">
                        <td className="flex flex-row items-center px-4 py-4">
                            <div className="flex w-10 h-10 mr-4">
                                <a href="#" className="relative block">
                                <img alt="profil" src="https://images.unsplash.com/photo-1560329072-17f59dcd30a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW4lMjBmYWNlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" className="object-cover w-10 h-10 mx-auto rounded-md" />
                                </a>
                            </div>
                            <div className="flex-1 pl-1">
                                <div className="font-medium dark:text-white">Barbara Curtis</div>
                                <div className="text-sm text-blue-600 dark:text-gray-200">
                                Account Deactivated
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-4">
                            480-570-3413
                        </td>
                        <td className="px-4 py-4">
                            MX-8523537435
                        </td>
                        <td className="px-4 py-4">
                            Just Now
                        </td>
                        </tr>
                        <tr className="py-10 border-b border-gray-200 hover:bg-gray-100">
                        <td className="flex flex-row items-center px-4 py-4">
                            <div className="flex w-10 h-10 mr-4">
                                <a href="#" className="relative block">
                                <img alt="profil" src="https://images.unsplash.com/photo-1571395443367-8fbb3962e48f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fG1lbiUyMGZhY2V8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="object-cover w-10 h-10 mx-auto rounded-md" />
                                </a>
                            </div>
                            <div className="flex-1 pl-1">
                                <div className="font-medium dark:text-white">Charlie Hawkins</div>
                                <div className="text-sm text-green-600 dark:text-gray-200">
                                Email Verified
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-4">
                            440-476-4873
                        </td>
                        <td className="px-4 py-4">
                            MX-9537537436
                        </td>
                        <td className="px-4 py-4">
                            Mar 04, 2018 11:37am
                        </td>
                        </tr>
                        <tr className="py-10 border-b border-gray-200 hover:bg-gray-100">
                        <td className="flex flex-row items-center px-4 py-4">
                            <div className="flex w-10 h-10 mr-4">
                                <a href="#" className="relative block">
                                <img alt="profil" src="https://images.unsplash.com/photo-1532170579297-281918c8ae72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGZlbWFsZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60" className="object-cover w-10 h-10 mx-auto rounded-md" />
                                </a>
                            </div>
                            <div className="flex-1 pl-1">
                                <div className="font-medium dark:text-white">Nina Bates</div>
                                <div className="text-sm text-yellow-600 dark:text-gray-200">
                                Payment On Hold
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-4">
                            206-783-1890
                        </td>
                        <td className="px-4 py-4">
                            MX-7533567437
                        </td>
                        <td className="px-4 py-4">
                            Mar 13, 2018 9:41am
                        </td>
                        </tr>
                        <tr className="py-10 border-b border-gray-200 hover:bg-gray-100">
                        <td className="flex flex-row items-center px-4 py-4">
                            <div className="flex w-10 h-10 mr-4">
                                <a href="#" className="relative block">
                                <img alt="profil" src="https://images.unsplash.com/photo-1474176857210-7287d38d27c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbiUyMGZhY2V8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="object-cover w-10 h-10 mx-auto rounded-md" />
                                </a>
                            </div>
                            <div className="flex-1 pl-1">
                                <div className="font-medium dark:text-white">Hester Richards</div>
                                <div className="text-sm text-green-600 dark:text-gray-200">
                                Email Verified
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-4">
                            931-499-6252
                        </td>
                        <td className="px-4 py-4">
                            MX-5673467743
                        </td>
                        <td className="px-4 py-4">
                            Feb 21, 2018 8:34am
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col items-center w-full px-4 py-2 space-y-2 text-sm text-gray-500 sm:justify-between sm:space-y-0 sm:flex-row">
                <p className="flex">Showing&nbsp;<span className="font-bold"> 1 to 4 </span>&nbsp;of 8 entries</p>
                <div className="flex items-center justify-between space-x-2">
                <a href="#" className="hover:text-gray-600">Previous</a>
                <div className="flex flex-row space-x-1">
                    <div className="flex px-2 py-px text-white bg-blue-400 border border-blue-400">1</div>
                    <div className="flex px-2 py-px border border-blue-400 hover:bg-blue-400 hover:text-white">2</div>
                </div>
                <a href="#" className="hover:text-gray-600">Next</a>
                </div>
            </div>
        </div>
    </div>     */}
    </>
  )
}

export default DashboardTable
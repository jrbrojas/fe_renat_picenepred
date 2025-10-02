import {
    useReactTable
} from '@tanstack/react-table'

//"id": 1,
//"periodo": "2018",
//"pprrd": 1,
//"evar": 0,

function DashboardTable({asistenciasdetalles={}}) {
    const columns = [
        {
            header: "ID",
            accessorKey: 'id'
        },
        {
            header: "PERIODO",
            accessorKey: 'periodo'
        },
        {
            header: "PPRRD",
            accessorKey: 'pprrd'
        },
        {
            header: "EVAR",
            accessorKey: 'evar'
        },
    ]
    const table = useReactTable({data: asistenciasdetalles, columns: columns})
  return (
    <div>
        <table>
            <thead>
                <tr><th>ID</th></tr>
            </thead>
            <tbody>
                <tr><td>1</td></tr>
            </tbody>
            <tfoot>
                <tr><td>id</td></tr>
            </tfoot>
        </table>
    </div>
  )
}

export default DashboardTable
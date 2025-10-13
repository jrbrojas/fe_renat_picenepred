import { ClipLoader } from "react-spinners";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import axiosClient from "../../../../axios-client";
import { useQuery } from "react-query";

// Periodos de Planificación (PDRC, POT, PAT, PDU)
const getResumen = async (ub) => {
  const url =
    ub === 0 || ub === "0"
      ? "/at_periodos_planificacion"
      : `/at_periodos_planificacion/${ub}`;
  const { data } = await axiosClient.get(url);
  // data esperado: [{ periodo, pdrc, pot, pat, pdu, total_fila }]
  return Array.isArray(data) ? data : [];
};

const DashboardTableResumenPlanificacion = ({ ubigeo = 0 }) => {
  const {
    data: d = [],
    isLoading,
    error,
  } = useQuery(["planif-periodos-table", ubigeo], () => getResumen(ubigeo));

  const sum = (key) => d.reduce((acc, r) => acc + (parseInt(r[key], 10) || 0), 0);

  const columns = [
    { header: "PERIODO", accessorKey: "periodo", cell: (info) => info.getValue(), footer: "TOTAL" },
    { header: "PDRC", accessorKey: "pdrc", cell: (info) => info.getValue(), footer: () => sum("pdrc") },
    { header: "PDLC", accessorKey: "pdrc", cell: (info) => info.getValue(), footer: () => sum("pdlc") },
    { header: "POT", accessorKey: "pot", cell: (info) => info.getValue(), footer: () => sum("pot") },
    { header: "PAT", accessorKey: "pat", cell: (info) => info.getValue(), footer: () => sum("pat") },
    { header: "PDU", accessorKey: "pdu", cell: (info) => info.getValue(), footer: () => sum("pdu") },
    { header: "POI", accessorKey: "poi", cell: (info) => info.getValue(), footer: () => sum("poi") },
    { header: "PEI", accessorKey: "pei", cell: (info) => info.getValue(), footer: () => sum("pei") },
    { header: "TOTAL", accessorKey: "total_fila", cell: (info) => info.getValue(), footer: () => sum("total_fila") },
  ];

  const table = useReactTable({
    data: d,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", margin: 20 }}>
        <ClipLoader color="#8884d8" size={40} />
        <p>Cargando datos.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-4 text-center text-red-600">
        Error al cargar los periodos de Planificación.
      </div>
    );
  }

  return (
    <div className="max-w-5xl p-2 mx-auto fill-gray-400">
      <table className="w-full border border-collapse border-gray-300">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="cabecera-cenepred">
              {hg.headers.map((h) => (
                <th key={h.id} className="capitalize px-3.5 py-2 border border-slate-300 text-center">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border border-slate-300 text-center px-3.5 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="h-32 text-center">
              <td colSpan={columns.length}>No se encontraron registros</td>
            </tr>
          )}
        </tbody>

        <tfoot>
          {table.getFooterGroups().map((fg) => (
            <tr key={fg.id} className="font-bold bg-gray-100">
              {fg.headers.map((footer) => (
                <th key={footer.id} className="border border-slate-400 text-center px-3.5 py-2">
                  {flexRender(footer.column.columnDef.footer, footer.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default DashboardTableResumenPlanificacion;

import { ClipLoader } from "react-spinners";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import axiosClient from "../../../../axios-client";
import { useQuery } from "react-query";
//mceiza
// Periodos de Planificación (PDRC, PDLC, POT, PAT, PDU + PDC, POI, PEI, ROF)
const getResumen = async (ub) => {
  const url =
    ub === 0 || ub === "0"
      ? "/at_periodos_planificacion"
      : `/at_periodos_planificacion/${ub}`;
  const { data } = await axiosClient.get(url);
  //mcieza
  // data esperado: [{ periodo, pdc, pdrc, pdlc, poi, pei, rof, pot, pat, pdu, total_fila }]
  return Array.isArray(data) ? data : [];
};

const DashboardTableResumenPlanificacion = ({ ubigeo = 0 }) => {
  const {
    data: d = [],
    isLoading,
    error,
  } = useQuery(["planif-periodos-table", ubigeo], () => getResumen(ubigeo));

  const safeNum = (v) => parseInt(v, 10) || 0;
  const sum = (key) => d.reduce((acc, r) => acc + safeNum(r[key]), 0);

  const columns = [
    { header: "PERIODO", accessorKey: "periodo", cell: (info) => info.getValue(), footer: "TOTAL" },
    //mcieza
    // Nuevos instrumentos estratégicos
    { header: "PDC", accessorKey: "pdc", cell: (info) => info.getValue() ?? 0, footer: () => sum("pdc") },
    { header: "ROF", accessorKey: "rof", cell: (info) => info.getValue() ?? 0, footer: () => sum("rof") },
    //mcieza
    // Instrumentos existentes
    { header: "PDRC", accessorKey: "pdrc", cell: (info) => info.getValue(), footer: () => sum("pdrc") },
    { header: "PDLC", accessorKey: "pdlc", cell: (info) => info.getValue() ?? 0, footer: () => sum("pdlc") },
    { header: "POT", accessorKey: "pot", cell: (info) => info.getValue(), footer: () => sum("pot") },
    { header: "PAT", accessorKey: "pat", cell: (info) => info.getValue(), footer: () => sum("pat") },
    { header: "PDU", accessorKey: "pdu", cell: (info) => info.getValue(), footer: () => sum("pdu") },
    { header: "POI", accessorKey: "poi", cell: (info) => info.getValue() ?? 0, footer: () => sum("poi") },
    { header: "PEI", accessorKey: "pei", cell: (info) => info.getValue() ?? 0, footer: () => sum("pei") },
    { header: "TOTAL", accessorKey: "total_fila", cell: (info) => info.getValue(), footer: () => sum("total_fila") },
  ];

  const table = useReactTable({
    data: d.map((r) => ({ 
      ...r, 
      pdc: safeNum(r.pdc),
      poi: safeNum(r.poi),
      pei: safeNum(r.pei),
      rof: safeNum(r.rof),
      pdlc: safeNum(r.pdlc)
    })),
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
      <div className="text-center text-red-600 my-4">
        Error al cargar los periodos de Planificación.
      </div>
    );
  }

  return (
    <div className="max-w-6xl p-2 mx-auto fill-gray-400">
      <table className="w-full border-collapse border border-gray-300">
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
            <tr key={fg.id} className="bg-gray-100 font-bold">
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

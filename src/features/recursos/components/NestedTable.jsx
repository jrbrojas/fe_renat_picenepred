import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ClipLoader } from "react-spinners";
import {useExpande} from "../../../hooks/useExpande";





const NestedTable = ({ubigeo=0,instrumento='PPRRD',url=''}) => {
  
  

const {data,error,isLoading} = useExpande(ubigeo,instrumento,url);

  const [expandedDepartments, setExpandedDepartments] = useState({});
  const [expandedProvinces, setExpandedProvinces] = useState({});

  const toggleDepartment = (index) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleProvince = (index) => {
    setExpandedProvinces((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

 /* const totalDistritos = data.reduce((sum, d) => sum + (parseInt(d.distritos) || 0), 0);
  const totalEntidades = data.reduce((sum, d) => sum + (parseInt(d.entidades_asistidas) || 0), 0);
  const totalPPRRD = data.reduce((sum, d) => sum + (parseInt(d.pprrd) || 0), 0);
  const totalPPRRDVigentes = data.reduce((sum, d) => sum + (parseInt(d.pprrd_vigentes) || 0), 0);
  const totalBrecha = data.reduce((sum, d) => sum + (parseInt(d.brecha) || 0), 0);
*/
  return (
    
    isLoading ? (
      <div style={{ textAlign: "center", margin: "20px" }}>
        <ClipLoader color="#8884d8" size={40} />
        <p>Cargando datos...</p>
      </div>
    ) : (
      <div className="p-4">
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="cabecera-cenepred">
          <th className="border border-gray-300 p-2">DEPARTAMENTO</th>
          <th className="border border-gray-300 p-2">DISTRITOS</th>
          <th className="border border-gray-300 p-2">ENTIDADES ASISTIDAS</th>
          <th className="border border-gray-300 p-2">PPRRD APROBADOS</th>
          <th className="border border-gray-300 p-2">PPRRD VIGENTES</th>
          <th className="border border-gray-300 p-2">BRECHA</th>
          
        </tr>
      </thead>
 <tbody>
        {data.map((dept, deptIndex) => (
          <React.Fragment key={dept.departamentos_id}>
            <tr
              key={dept.departamentos_id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => toggleDepartment(deptIndex)}
            >
              <td className="border border-gray-300 p-2 flex items-center gap-2">
                {expandedDepartments[deptIndex] ? <ChevronDown size={18} className="icono-cenepred"/> : <ChevronRight size={18} className="icono-cenepred"/>}
                {dept.dpto}
              </td>
              <td className="border border-gray-300 p-2">{dept.distritos}</td>
              <td className="border border-gray-300 p-2">{dept.entidades_asistidas}</td>
              <td className="border border-gray-300 p-2">{dept.pprrd}</td>
              <td className="border border-gray-300 p-2">{dept.pprrd_vigentes}</td>
              <td className="border border-gray-300 p-2">{dept.brecha}</td>
              
            </tr>
            {expandedDepartments[deptIndex] &&
              dept.provincias.map((prov, provIndex) => (
                <React.Fragment key={prov.provincias_id}>
                  <tr
                    key={`${dept.departamentos_id}-${prov.provincias_id}`}
                    className="cursor-pointer  hover:bg-gray-100"
                    onClick={() => toggleProvince(`${deptIndex}-${provIndex}`)}
                  >
                    <td className="border border-gray-300 p-2 pl-6 flex items-center gap-2">
                      {
                        
                      prov.pprrd> 0 ? expandedProvinces[`${deptIndex}-${provIndex}`] ? <ChevronDown size={18} className="icono-cenepred" /> : <ChevronRight size={18} className="icono-cenepred"/>:'   -   '
                      }
                      {prov.provincia}
                    </td>
                     <td className="border border-gray-300 p-2">{prov.distritos}</td>
                    <td className="border border-gray-300 p-2">{prov.entidades_asistidas}</td>
                    <td className="border border-gray-300 p-2">{prov.pprrd}</td>
                    <td className="border border-gray-300 p-2">{prov.pprrd_vigentes}</td>
                    <td className="border border-gray-300 p-2">{prov.brecha}</td>
                    
                  </tr>
                  {expandedProvinces[`${deptIndex}-${provIndex}`] &&
                    prov.distrito.map((dist, distIndex) => (
                      <tr key={`${dept.departamentos_id}-${prov.provincias_id}-${dist.distritos_id}`}>
                        <td colSpan={2} className="border border-gray-400 p-2 pl-12"> - {dist.distrito}</td>
                        <td className="border border-gray-300 p-2">{dist.entidades_asistidas}</td>
                        <td className="border border-gray-300 p-2">{dist.pprrd}</td>
                        <td className="border border-gray-300 p-2">{dist.pprrd_vigentes}</td>
                        <td className="border border-gray-300 p-2">-</td>
                        
                      </tr>
                    ))}
               </React.Fragment>
              ))}
         </React.Fragment>
        ))}
      {/* <tr className="font-bold">
        <td className="border border-gray-300 p-2">TOTALES</td>
        <td className="border border-gray-300 p-2">{totalDistritos}</td>
        <td className="border border-gray-300 p-2">{totalEntidades}</td>
        <td className="border border-gray-300 p-2">{totalPPRRD}</td>
        <td className="border border-gray-300 p-2">{totalPPRRDVigentes}</td>
        <td className="border border-gray-300 p-2">{totalBrecha}</td>
      </tr>*/}
     </tbody>
    </table>
  </div>
    )
  
  );
  
}

export default NestedTable;

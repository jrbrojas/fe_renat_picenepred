import React,{ useState} from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ClipLoader } from "react-spinners";
import {useResumen} from "../../../../hooks/useResumen";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';




export const NestedPeriodos = ({ubigeo=0}) => {

  
    const {data,error,isLoading} = useResumen(ubigeo,'fases_pprrd_periodos');
   

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

  const totalPreparacion = !isLoading ? data.reduce((sum, d) => sum + (parseInt(d.preparacion) || 0), 0) : 0;
  const totalDiagnostico = !isLoading ? data.reduce((sum, d) => sum + (parseInt(d.diagnostico) || 0), 0) : 0;
  const totalFormulacion = !isLoading ? data.reduce((sum, d) => sum + (parseInt(d.formulacion) || 0), 0) : 0;
  const totalValidacion = !isLoading ? data.reduce((sum, d) => sum + (parseInt(d.validacion) || 0), 0) : 0;
  const totalAprobacion = !isLoading ? data.reduce((sum, d) => sum + (parseInt(d.aprobacion) || 0), 0) : 0;


  return (
    
    isLoading ? (
      <div style={{ textAlign: "center", margin: "20px" }}>
        <ClipLoader color="#8884d8" size={40} />
        <p>Cargando datos...</p>
      </div>
    ) : (
      <div className="p-4">

                <div className="btn-excel-cenepred" style={{display:'flex',width:'75px'}}>
                            <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="1" fill-rule="evenodd" clip-rule="evenodd" d="M3 14.25C3.41421 14.25 3.75 14.5858 3.75 15C3.75 16.4354 3.75159 17.4365 3.85315 18.1919C3.9518 18.9257 4.13225 19.3142 4.40901 19.591C4.68577 19.8678 5.07435 20.0482 5.80812 20.1469C6.56347 20.2484 7.56459 20.25 9 20.25H15C16.4354 20.25 17.4365 20.2484 18.1919 20.1469C18.9257 20.0482 19.3142 19.8678 19.591 19.591C19.8678 19.3142 20.0482 18.9257 20.1469 18.1919C20.2484 17.4365 20.25 16.4354 20.25 15C20.25 14.5858 20.5858 14.25 21 14.25C21.4142 14.25 21.75 14.5858 21.75 15V15.0549C21.75 16.4225 21.75 17.5248 21.6335 18.3918C21.5125 19.2919 21.2536 20.0497 20.6517 20.6516C20.0497 21.2536 19.2919 21.5125 18.3918 21.6335C17.5248 21.75 16.4225 21.75 15.0549 21.75H8.94513C7.57754 21.75 6.47522 21.75 5.60825 21.6335C4.70814 21.5125 3.95027 21.2536 3.34835 20.6517C2.74643 20.0497 2.48754 19.2919 2.36652 18.3918C2.24996 17.5248 2.24998 16.4225 2.25 15.0549C2.25 15.0366 2.25 15.0183 2.25 15C2.25 14.5858 2.58579 14.25 3 14.25Z" fill="#FFFFFF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 16.75C12.2106 16.75 12.4114 16.6615 12.5535 16.5061L16.5535 12.1311C16.833 11.8254 16.8118 11.351 16.5061 11.0715C16.2004 10.792 15.726 10.8132 15.4465 11.1189L12.75 14.0682V3C12.75 2.58579 12.4142 2.25 12 2.25C11.5858 2.25 11.25 2.58579 11.25 3V14.0682L8.55353 11.1189C8.27403 10.8132 7.79963 10.792 7.49393 11.0715C7.18823 11.351 7.16698 11.8254 7.44648 12.1311L11.4465 16.5061C11.5886 16.6615 11.7894 16.75 12 16.75Z" fill="#FFFFFF"/>
                    </svg>
                              <ReactHTMLTableToExcel
                              id="botonExportar"
                              className="texto-boton"
                              table="entidades_fases"
                              filename="entidades_fases"
                              sheet="Resumen"
                              buttonText="Excel"
                              />  
                        </div>
              
    <table id="entidades_fases" className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="cabecera-cenepred">
          <th className="border border-gray-300 p-2">PERIODO</th>
          <th className="border border-gray-300 p-2">PREPARACIÓN</th>
          <th className="border border-gray-300 p-2">DIAGNOSTICO</th>
          <th className="border border-gray-300 p-2">FORMULACION</th>
          <th className="border border-gray-300 p-2">VALIDACIÓN</th>
          <th className="border border-gray-300 p-2">APROBACIÓN</th>
          
          
        </tr>
      </thead>
 <tbody>
        {data.map((dept, deptIndex) => (
          <React.Fragment key={dept.periodo}>
            <tr
              key={deptIndex}
              className="hover:bg-gray-100"
              /*onClick={() => toggleDepartment(deptIndex)}*/
            >
              <td className="border border-gray-300 p-2 flex items-center gap-2">
                {/*expandedDepartments[deptIndex] ? <ChevronDown size={18} className="icono-cenepred"/> : <ChevronRight size={18} className="icono-cenepred"/>*/}
                {dept.periodo}
              </td>
              <td className="border border-gray-300 p-2">{dept.preparacion}</td>
              <td className="border border-gray-300 p-2">{dept.diagnostico}</td>
              <td className="border border-gray-300 p-2">{dept.formulacion}</td>
              <td className="border border-gray-300 p-2">{dept.validacion}</td>
              <td className="border border-gray-300 p-2">{dept.aprobacion}</td>
              
              </tr>
            {expandedDepartments[deptIndex] &&
              dept.provincias.map((prov, provIndex) => (
                <React.Fragment key={provIndex}>
                  <tr
                    key={`${dept.ubigeo_departamento}-${prov.ubigeo_provincia}`}
                    className="cursor-pointer  hover:bg-gray-100"
                    onClick={() => toggleProvince(`${deptIndex}-${provIndex}`)}
                  >
                    <td className="border border-gray-300 p-2 pl-6 flex items-center gap-2">
                      {
                        
                      prov.total > 0 ? expandedProvinces[`${deptIndex}-${provIndex}`] ? <ChevronDown size={18} className="icono-cenepred" /> : <ChevronRight size={18} className="icono-cenepred"/>:'   -   '
                      }
                      {prov.provincia}
                    </td>
                     <td className="border border-gray-300 p-2">{prov.nacional}</td>
                     <td className="border border-gray-300 p-2">{prov.regional}</td>
                    <td className="border border-gray-300 p-2">{prov.provincial}</td>
                    <td className="border border-gray-300 p-2">{prov.distrital}</td>
                    <td className="border border-gray-300 p-2">{prov.total}</td>
                    
                    
                  </tr>
                  {expandedProvinces[`${deptIndex}-${provIndex}`] &&
                    prov.distritos.map((dist, distIndex) => (
                      <tr key={`${dept.ubigeo_departamento}-${prov.ubigeo_provincia}-${dist.ubigeo_distrito}`}>
                        <td className="border border-gray-400 p-2 pl-12"> {dist.distrito}</td>
                        <td className="border border-gray-300 p-2">{dist.nacional}</td>
                        <td className="border border-gray-300 p-2">{dist.regional}</td>
                        <td className="border border-gray-300 p-2">{dist.provincial}</td>
                        <td className="border border-gray-300 p-2">{dist.distrital}</td>
                        <td className="border border-gray-300 p-2">{dist.total}</td>
                        
                      </tr>
                    ))}
                </React.Fragment>
              ))}
          </React.Fragment>
        ))}
       {<tr className="font-bold bg-gray-100">
              <td className="border border-gray-300 p-2">TOTALES</td>
              <td className="border border-gray-300 p-2">{totalPreparacion}</td>
              <td className="border border-gray-300 p-2">{totalDiagnostico}</td>
              <td className="border border-gray-300 p-2">{totalFormulacion}</td>
              <td className="border border-gray-300 p-2">{totalValidacion}</td>
              <td className="border border-gray-300 p-2">{totalAprobacion}</td>
            </tr>}
     </tbody>
    </table>
  </div>
    )
  
  );
}



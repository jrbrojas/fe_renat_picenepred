import { useState,useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ClipLoader } from "react-spinners";
import axiosClient from "../../../../axios-client";


const NestedTable = ({ubigeo=0,instrumento='PPRRD'}) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


useEffect(() => {

  const getResumen = async () =>{
    setLoading(true)
    try {
        await axiosClient.get(`/departamen_detalle/${ubigeo}/${instrumento}`)
            .then(({data}) => {
                setData(data);
                setLoading(false);
   
        })
        
    } catch (error) {
        setError(error.message); 
    } finally {
     
    }
  }
  getResumen();

}, [ubigeo]);



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



  return (
    
    loading ? (
      <div style={{ textAlign: "center", margin: "20px" }}>
        <ClipLoader color="#8884d8" size={40} />
        <p>Cargando datos...</p>
      </div>
    ) : (
      <div className="p-4">
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="cabecera-cenepred" >
          <th className="border border-gray-300 p-2">DEPARTAMENTO</th>
          <th className="border border-gray-300 p-2">DISTRITOS</th>
          <th className="border border-gray-300 p-2">ENTIDADES</th>
          <th className="border border-gray-300 p-2">PAA APROBADOS</th>
          <th className="border border-gray-300 p-2">PAA VIGENTES</th>
          <th className="border border-gray-300 p-2">BRECHA</th>
          
        </tr>
      </thead>
 <tbody>
        {data.map((dept, deptIndex) => (
          <>
            <tr
              key={dept.departamentos_id}
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => toggleDepartment(deptIndex)}
            >
              <td className="border border-gray-300 p-2 flex items-center gap-2">
                {expandedDepartments[deptIndex] ? <ChevronDown size={18} style={{color:"rgb(0 131 155 / var(--tw-bg-opacity))"}} /> : <ChevronRight size={18} style={{color:"rgb(0 131 155 / var(--tw-bg-opacity))"}} />}
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
                <>
                  <tr
                    key={`${dept.departamentos_id}-${prov.provincias_id}`}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleProvince(`${deptIndex}-${provIndex}`)}
                  >
                    <td className="border border-gray-300 p-2 pl-6 flex items-center gap-2">
                      {
                        
                      prov.pprrd> 0 ? expandedProvinces[`${deptIndex}-${provIndex}`] ? <ChevronDown size={18} style={{color:"rgb(0 131 155 / var(--tw-bg-opacity))"}} /> : <ChevronRight size={18} style={{color:"rgb(0 131 155 / var(--tw-bg-opacity))"}}  />:'   -   '
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
                </>
              ))}
          </>
        ))}
     </tbody>
    </table>
  </div>
    )
  
  );
  
}


export default NestedTable;

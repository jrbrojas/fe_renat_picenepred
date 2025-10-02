import { useState,useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ClipLoader } from "react-spinners";
import axiosClient from "../../../axios-client";


const NestedTableInicio = ({ubigeo=0}) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


useEffect(() => {
  const getResumen = async () =>{
    try {
      setLoading(true);
             await axiosClient.get('/departamentos_pprrd_inicio/'+ubigeo)
            .then(({data}) => {
                setData(data.data);
                setLoading(false);
   
        })
        
    } catch (error) {
        console.log(error.message); 
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
    <div className="p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200" style={{ backgroundColor: "rgb(0 131 155 / var(--tw-bg-opacity))", color: "white" }}>
            <th rowSpan={2} className="bg-gray-600 border border-gray-300 p-2">DEPARTAMENTOS</th>
            <th colSpan={2} className="border border-gray-300 p-2">ASISTENCIA TÉCNICA PPRRD</th>
            <th colSpan={2} className="border border-gray-300 p-2">FORTALECIMIENTO DE CAPACIDADES</th>
            <th colSpan={3} className="border border-gray-300 p-2">PPRRD DISTRITOS</th>
            <th colSpan={2} className="border border-gray-300 p-2">EVAR</th>
            <th rowSpan={2} className="border border-gray-300 p-2">ACREDITACIÓN</th>
          </tr>
          <tr className="text-center">
            <th className="text-xs border border-gray-300">PPRRD</th>
            <th className="text-xs border border-gray-300">APROBADOS</th>
            <th className="text-xs border border-gray-300">FORMACIÓN BÁSICA</th>
            <th className="text-xs border border-gray-300">FORMACIÓN ESPECIALIZADA</th>
            <th className="text-xs border border-gray-300">DISTRITOS</th>
            <th className="text-xs border border-gray-300">PPRRD VIGENTES</th>
            <th className="text-xs border border-gray-300">BRECHA</th>
            <th className="text-xs border border-gray-300">DISTRITO</th>
            <th className="text-xs border border-gray-300">EVAR</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={11} className="text-center p-4">
                <ClipLoader color="#8884d8" size={45} />
                <p>Cargando datos...</p>
              </td>
            </tr>
          ) : (
            data.map((dept, deptIndex) => (
              <>
                <tr className="bg-gray-100 hover:bg-gray-200 text-center">
                  <td className="border border-gray-300 p-2">{dept.dpto}</td>
                  <td className="border border-gray-300 p-2">{dept.entidades_asistidas}</td>
                  <td className="border border-gray-300 p-2">{dept.pprrd}</td>
                  <td className="border border-gray-300 p-2">{dept.formacion_basica}</td>
                  <td className="border border-gray-300 p-2">{dept.formacion_especializada}</td>
                  <td className="border border-gray-300 p-2">{dept.distritos}</td>
                  <td className="border border-gray-300 p-2">{dept.pprrd}</td>
                  <td className="border border-gray-300 p-2">{dept.brecha}</td>
                  <td className="border border-gray-300 p-2">{dept.distritos}</td>
                  <td className="border border-gray-300 p-2">{dept.evar}</td>
                  <td className="border border-gray-300 p-2 text-center">{dept.evaluadores}</td>
                </tr>

                {expandedDepartments[deptIndex] &&
                  dept.provincias.map((prov, provIndex) => (
                    <>
                      <tr className="cursor-pointer bg-gray-50 hover:bg-gray-100" onClick={() => toggleProvince(`${deptIndex}-${provIndex}`)}>
                        <td className="border border-gray-300 p-2 pl-6 flex items-center gap-2">
                          {expandedProvinces[`${deptIndex}-${provIndex}`] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          {prov.provincia}
                        </td>
                        <td className="border border-gray-300 p-2">{prov.distritos} distritos</td>
                        <td className="border border-gray-300 p-2">{prov.entidades_asistidas}</td>
                        <td className="border border-gray-300 p-2">{prov.pprrd_vigentes}</td>
                        <td className="border border-gray-300 p-2">{prov.brecha}</td>
                        <td className="border border-gray-300 p-2">{prov.acreditacion}</td>
                      </tr>

                      {expandedProvinces[`${deptIndex}-${provIndex}`] &&
                        prov.distrito.map((dist) => (
                          <tr key={`${dept.departamentos_id}-${prov.provincias_id}-${dist.distritos_id}`}>
                            <td colSpan={2} className="border border-gray-300 p-2 pl-12">- {dist.distrito}</td>
                            <td className="border border-gray-300 p-2">{dist.entidades_asistidas}</td>
                            <td className="border border-gray-300 p-2">{dist.pprrd_vigentes}</td>
                            <td className="border border-gray-300 p-2">-</td>
                            <td className="border border-gray-300 p-2">{dist.acreditacion}</td>
                          </tr>
                        ))}
                    </>
                  ))}
              </>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
  



export default NestedTableInicio;

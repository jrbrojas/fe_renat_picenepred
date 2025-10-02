import { useState,useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ClipLoader } from "react-spinners";
import axiosClient from "../../../axios-client";


const NestedTable = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {

  const getResumen = async () =>{
    try {
        await axiosClient.get('/departamen_detalle')
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

}, []);



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
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2">Departamento</th>
          <th className="border border-gray-300 p-2">Provincias</th>
          <th className="border border-gray-300 p-2">Entidades Asistidas</th>
          <th className="border border-gray-300 p-2">PPRRD Vigentes</th>
          <th className="border border-gray-300 p-2">Brecha</th>
          <th className="border border-gray-300 p-2">Evaluadores</th>
        </tr>
      </thead>
 <tbody>
        {data.map((dept, deptIndex) => (
          <>
            <tr
              key={dept.departamentos_id}
              className="cursor-pointer bg-gray-100 hover:bg-gray-200"
              onClick={() => toggleDepartment(deptIndex)}
            >
              <td className="border border-gray-300 p-2 flex items-center gap-2">
                {expandedDepartments[deptIndex] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                {dept.dpto}
              </td>
              <td className="border border-gray-300 p-2">{dept.provincia}</td>
              <td className="border border-gray-300 p-2">{dept.entidades_asistidas}</td>
              <td className="border border-gray-300 p-2">{dept.pprrd_vigentes}</td>
              <td className="border border-gray-300 p-2">{dept.brecha}</td>
              <td className="border border-gray-300 p-2">{dept.evaluadores}</td>
            </tr>
            {expandedDepartments[deptIndex] &&
              dept.provincias.map((prov, provIndex) => (
                <>
                  <tr
                    key={`${dept.departamentos_id}-${prov.provincias_id}`}
                    className="cursor-pointer bg-gray-50 hover:bg-gray-100"
                    onClick={() => toggleProvince(`${deptIndex}-${provIndex}`)}
                  >
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
                    prov.distrito.map((dist, distIndex) => (
                      <tr key={`${dept.departamentos_id}-${prov.provincias_id}-${dist.distritos_id}`}>
                        <td colSpan={2} className="border border-gray-300 p-2 pl-12"> - {dist.distrito}</td>
                        <td className="border border-gray-300 p-2">{dist.entidades_asistidas}</td>
                        <td className="border border-gray-300 p-2">{dist.pprrd_vigentes}</td>
                        <td className="border border-gray-300 p-2">-</td>
                        <td  className="border border-gray-300 p-2">{dist.acreditacion}</td>
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

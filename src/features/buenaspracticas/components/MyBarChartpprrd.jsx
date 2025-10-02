
import { useState,useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ClipLoader } from "react-spinners";
import axiosClient from "../../../axios-client";


const MyBarChartpprrs = ({ubigeo}) => {

const [resumen, setResumen] = useState([]); 
const [loading, setLoading] = useState(true);  

    
useEffect(() => {

  const getResumen = async () =>{
    try {
      setLoading(true);
        await axiosClient.get('/planesaprobados/'+ubigeo)
            .then((response) => {
                setResumen(response.data.data);
                setLoading(false);
        })
        
    } catch (error) {
        setError(error.message); 
    } finally {
     
    }
  }

  getResumen();
}, [ubigeo]);
  return (

    loading ? (
      <div style={{ textAlign: "center", margin: "120px" }}>
        <ClipLoader color="#8884d8" size={40} />
        <p>Cargando datos...</p>
      </div>
    ) :(

    <ResponsiveContainer width="100%" height={460}>
      <BarChart data={resumen} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} title={"PPTTD"}>
        <XAxis dataKey="periodo" />
        <YAxis/>
        {<Tooltip />}
        <Legend />
        <Bar dataKey="aprobados" fill="#8884d8" name="PPRRD Aprobados"  barSize={15} />
        <Bar dataKey="vigentes" fill="#82ca9d" name="PPRRD Vigentes" barSize={15}/>
      </BarChart>
    </ResponsiveContainer>
    )
  );
};

export default MyBarChartpprrs;

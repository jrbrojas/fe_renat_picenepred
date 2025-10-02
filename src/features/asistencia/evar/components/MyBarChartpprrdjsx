
import { useState,useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ClipLoader } from "react-spinners";
import axiosClient from "../../../../axios-client";


const MyBarChartpprrs = ({ubigeo=0,instrumento}) => {

const [resumen, setResumen] = useState([]); 
const [loading, setLoading] = useState(true);  

    
useEffect(() => {

  const getResumen = async () =>{
    try {
      setLoading(true);
        await axiosClient.get(`/planesaprobados/${ubigeo}/${instrumento}`)
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
};

export default MyBarChartpprrs;

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from "recharts";
import { useState,useEffect } from 'react';
import axiosClient from "../../../axios-client";


const LineChartComponent = ({ubigeo}) => {
  
const [resumen, setResumen] = useState([]);  

    
useEffect(() => {

  const getResumen = async () =>{
    try {
        await axiosClient.get('/capacitados_annio/'+ubigeo)
            .then((response) => {
                setResumen(response.data.data);
   
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
    <LineChart width={480} height={450} data={resumen}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="annio" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="linear" dataKey="total" stroke="#8884d8" strokeWidth={2} />
    </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;

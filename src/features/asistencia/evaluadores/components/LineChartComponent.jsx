import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from "recharts";
import { useState,useEffect } from 'react';
import { ClipLoader } from "react-spinners";
import axiosClient from "../../../../axios-client";
import { useQuery } from "react-query";

const getResumen = async (u) => {
  const {data} = await axiosClient.get('/periodos_pprrd_inicio/'+u);
          return data;
  } 



const LineChartComponent = ({ubigeo}) => {
  
const [datos, setDatos] = useState([]); 
const [loading, setLoading] = useState(false);  


 const {data:d,error,isLoading} = useQuery(["linechart-acre"+ubigeo], () => getResumen(ubigeo),{refetchOnWindowFocus:false,staleTime:Infinity});

    /*
useEffect(() => {

  const getResumen = async () =>{
    try {
        setLoading(true);
        await axiosClient.get(`periodos_pprrd_inicio/${ubigeo}`)
            .then((response) => {
                setDatos(response.data);
                setLoading(false);
   
        })
        
    } catch (error) {
        setError(error.message); 
    } finally {
     
    }
  }

  getResumen();
}, [ubigeo]);

*/

  return (
    
   
    <ResponsiveContainer width="100%" height={460}>
    <LineChart width={480} height={450} data={d}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="periodo"/>
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="linear" dataKey="evaluadores" stroke="#8884d8" strokeWidth={2} />
    </LineChart>
    </ResponsiveContainer>
    
  );
};

export default LineChartComponent;

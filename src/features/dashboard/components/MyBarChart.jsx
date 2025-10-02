
import { useState,useEffect } from 'react';
import { useQuery } from "react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axiosClient from "../../../axios-client";



const getResumen = async (u) => {
  const {data} = await axiosClient.get('/capacitados/'+u);
          return data;
  } 



const MyBarChart = ({ubigeo}) => {
  
const {data:resumen,error,isLoading} = useQuery(["Mybarchaar-"+ubigeo], () => getResumen(ubigeo));


//const [resumen, setResumen] = useState([]);


 /*   
useEffect(() => {

  const getResumen = async () =>{
    try {

        await axiosClient.get('/capacitados/'+ubigeo)
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
*/

  return (


    <ResponsiveContainer width="100%" height={460}>
      <BarChart data={resumen} margin={{ top: 20, right: 30, left: 20, bottom:5 }}>
        <XAxis dataKey="annio"/>
        <YAxis/>
        {<Tooltip />}
        <Legend />
        <Bar dataKey="formacion_basica" fill="#8884d8" name="Formación Básica"  barSize={15} />
        <Bar dataKey="formacion_especializada" fill="#82ca9d" name="Formación Especializada" barSize={15}/>
      </BarChart>
    </ResponsiveContainer>
    )
  
};

export default MyBarChart;

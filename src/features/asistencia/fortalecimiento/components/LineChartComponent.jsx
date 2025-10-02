import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from "recharts";
import axiosClient from "../../../../axios-client";
import { useQuery } from "react-query";


const getResumen = async (u) => {
  const {data} = await axiosClient.get(`/periodos_pprrd_inicio/${u}`);
          return data;
  } 



const LineChartComponent = ({ubigeo}) => {
const {data:datos,error,isLoading} = useQuery(["LineChartforta"+ubigeo], () => getResumen(ubigeo));  

  return (

    <ResponsiveContainer width="100%" height={460}>
    <LineChart width={480} height={450} data={datos}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="periodo" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="linear" dataKey="formacion_basica" stroke="#00FF00" strokeWidth={2} />
      <Line type="linear" dataKey="formacion_especializada" stroke="#8884d8" strokeWidth={2} />
      
    </LineChart>
    </ResponsiveContainer>
    
  )
};

export default LineChartComponent;

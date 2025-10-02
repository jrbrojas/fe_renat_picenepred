import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from "recharts";
import axiosClient from "../../../axios-client";
import { useQuery } from "react-query";
 

const getResumen = async (u) => {
  const {data} = await axiosClient.get('/capacitados/'+u);
          return data;
  } 

const LineChartComponent = ({ubigeo}) => {

  const {data:d,error,isLoading} = useQuery(["linecharts"+ubigeo], () => getResumen(ubigeo),{refetchOnWindowFocus:false,staleTime:Infinity});


  return (
    <ResponsiveContainer width="100%" height={460}>
    <LineChart width={480} height={450} data={d}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="annio" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="linear" dataKey="cursos" stroke="#ff0000" strokeWidth={2} />
      <Line type="linear" dataKey="personas" stroke="#8884d8" strokeWidth={2} />
    </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;

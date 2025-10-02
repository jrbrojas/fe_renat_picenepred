
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ClipLoader } from "react-spinners";
import axiosClient from "../../../../axios-client";
import { useQuery } from "react-query";



const getResumen = async (u,i) => {
  const {data} = await axiosClient.get(`/at_periodos_otros/${u}`);
          return data;
  } 

const MyBarChartpprrs = ({ubigeo=0,instrumento}) => {

const {data:d,error,isLoading} = useQuery(["MyBarChartOtros-"+ubigeo], () => getResumen(ubigeo,instrumento));
  

  return (

    isLoading ? (
      <div className="text-center">
          <ClipLoader color="#8884d8" size={45} />
          <p>Cargando gráfico...</p>
      </div>
    ) : (

    <ResponsiveContainer width="100%" height={460}>
      <BarChart data={d} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} title={"PPTTD"}>
        <XAxis dataKey="periodo" />
        <YAxis/>
        {<Tooltip />}
        <Legend />
        <Bar dataKey="pec" fill="#8884d8" name="PEC"  barSize={10} />
        <Bar dataKey="reas_pob" fill="#82ca9d" name="REAS POB" barSize={10}/>
        <Bar dataKey="act_rep" fill="#faca9d" name="ACT REP" barSize={10}/>
      </BarChart>
    </ResponsiveContainer>
    
  )
)
};

export default MyBarChartpprrs;

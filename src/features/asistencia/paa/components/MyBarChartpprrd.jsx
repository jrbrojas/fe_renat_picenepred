
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useExpande} from '../../../../hooks/useExpande';
import { ClipLoader } from "react-spinners";

const MyBarChartpprrs = ({ubigeo=0,instrumento,titulo=''}) => {

  const {data:d,error,isLoading} = useExpande(ubigeo,instrumento,'periodos_otros_documentos')


  return (

    isLoading ? (
      <div className="text-center">
          <ClipLoader color="#8884d8" size={45} />
          <p>Cargando gráfico...</p>
      </div>
    ) : (

    <ResponsiveContainer width="100%" height={460}>
      <BarChart data={d} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} title={titulo}>
        <XAxis dataKey="periodo" />
        <YAxis/>
        {<Tooltip />}
        <Legend />
         <Bar dataKey="aprobados" fill="#8884d8" name={ titulo + " APROBADOS"}  barSize={15} />
        <Bar dataKey="vigentes" fill="#82ca9d" name={titulo + " VIGENTES "} barSize={15}/>
        
      </BarChart>
    </ResponsiveContainer>
    
  )
)
};

export default MyBarChartpprrs;

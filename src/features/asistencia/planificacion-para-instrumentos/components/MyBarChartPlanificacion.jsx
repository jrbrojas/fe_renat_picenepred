import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ClipLoader } from "react-spinners";
import axiosClient from "../../../../axios-client";
import { useQuery } from "react-query";

const getResumen = async (u) => {
    const {data} = await axiosClient.get(`/periodos_planificacion/${u}`);
    return data;
} 

const MyBarChartPlanificacion = ({ubigeo = 0}) => {
    const {data:d, error, isLoading} = useQuery(["MyBarChartPlanificacion-"+ubigeo], () => getResumen(ubigeo));
    
    return (
        isLoading ? (
            <div className="text-center">
                <ClipLoader color="#8884d8" size={45} />
                <p>Cargando gráfico...</p>
            </div>
        ) : (
            <ResponsiveContainer width="100%" height={460}>
                <BarChart data={d} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="periodo" />
                    <YAxis/>
                    <Tooltip />
                    <Legend />
                    {/* Instrumentos Estratégicos */}
                    <Bar dataKey="pdc" fill="#4C72B0" name="PDC" barSize={10} />
                    <Bar dataKey="pdrc" fill="#8884d8" name="PDRC" barSize={10} />
                    <Bar dataKey="pdlc" fill="#4682B4" name="PDLC" barSize={10} />
                    <Bar dataKey="poi" fill="#55A868" name="POI" barSize={10} />
                    <Bar dataKey="pei" fill="#64B5CD" name="PEI" barSize={10} />
                    <Bar dataKey="rof" fill="#CCB974" name="ROF" barSize={10} />
                    
                    {/* Otros Instrumentos */}
                    <Bar dataKey="pot" fill="#82ca9d" name="POT" barSize={10}/>
                    <Bar dataKey="pat" fill="#faca9d" name="PAT" barSize={10}/>
                    <Bar dataKey="pdu" fill="#ff6b6b" name="PDU" barSize={10}/>
                </BarChart>
            </ResponsiveContainer>
        )
    );
};

export default MyBarChartPlanificacion;
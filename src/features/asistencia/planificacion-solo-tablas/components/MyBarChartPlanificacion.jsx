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
    
    // Paleta de colores mejorada con mayor contraste y distinción
    const colorPalette = {
        prdc: "#1d4ed8", // Azul profundo
        pldc: "#3b82f6", // Azul claro
        pot:  "#22c55e", // Verde brillante
        pat:  "#f97316", // Naranja intenso
        pdu:  "#ef4444", // Rojo vivo
        poi:  "#8b5cf6", // Morado vibrante
        pei:  "#06b6d4"  // Cian brillante
    };

    
    return (
        isLoading ? (
            <div className="text-center">
                <ClipLoader color="#2563eb" size={45} />
                <p>Cargando gráfico...</p>
            </div>
        ) : (
            <ResponsiveContainer width="100%" height={460}>
                <BarChart 
                    data={d} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    barCategoryGap="20%"
                >
                    <XAxis 
                        dataKey="periodo" 
                        tick={{ fontSize: 12 }}
                        tickLine={{ stroke: '#6b7280' }}
                        axisLine={{ stroke: '#6b7280' }}
                    />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        tickLine={{ stroke: '#6b7280' }}
                        axisLine={{ stroke: '#6b7280' }}
                    />
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: '#f9fafb',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    />
                    <Legend 
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="rect"
                    />
                    <Bar 
                        dataKey="prdc" 
                        fill={colorPalette.prdc} 
                        name="PDC" 
                        barSize={12}
                        radius={[2, 2, 0, 0]}
                    />
                    <Bar 
                        dataKey="pdlc" 
                        fill={colorPalette.pdlc} 
                        name="PDLC" 
                        barSize={12}
                        radius={[2, 2, 0, 0]}
                    />
                    <Bar 
                        dataKey="pot" 
                        fill={colorPalette.pot} 
                        name="POT" 
                        barSize={12}
                        radius={[2, 2, 0, 0]}
                    />
                    <Bar 
                        dataKey="pat" 
                        fill={colorPalette.pat} 
                        name="PAT" 
                        barSize={12}
                        radius={[2, 2, 0, 0]}
                    />
                    <Bar 
                        dataKey="pdu" 
                        fill={colorPalette.pdu} 
                        name="PDU" 
                        barSize={12}
                        radius={[2, 2, 0, 0]}
                    />
                    <Bar 
                        dataKey="poi" 
                        fill={colorPalette.poi} 
                        name="POI" 
                        barSize={12}
                        radius={[2, 2, 0, 0]}
                    />
                    <Bar 
                        dataKey="pei" 
                        fill={colorPalette.pei} 
                        name="PEI" 
                        barSize={12}
                        radius={[2, 2, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        )
    );
};

export default MyBarChartPlanificacion;
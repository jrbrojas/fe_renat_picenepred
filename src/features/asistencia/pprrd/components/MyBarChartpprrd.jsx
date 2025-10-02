
import { useState,useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ClipLoader } from "react-spinners";
import axiosClient from "../../../../axios-client";
import { useQuery } from "react-query";



const getResumen = async (u,i) => {
  const {data} = await axiosClient.get(`/periodos_pprrd_inicio/${u}`);
          return data;
  } 

const MyBarChartpprrs = ({ubigeo=0,instrumento}) => {

const {data:d,error,isLoading} = useQuery(["MyBarChartpprrd-"+ubigeo], () => getResumen(ubigeo,instrumento));
  

  return (

       isLoading ? (
            <div className="text-center">
                <ClipLoader color="#8884d8" size={45} />
                <p>Cargando gráfico...</p>
            </div>
          ) : (

    <ResponsiveContainer width="100%" height={460}>
      <BarChart data={d} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} title={"PPRRD"}>
        <XAxis dataKey="periodo" />
        <YAxis/>
        {<Tooltip />}
        <Legend />
        <Bar dataKey="pprrd" fill="#8884d8" name="PPRRD Aprobados"  barSize={15} />
        <Bar dataKey="pprrd_vigentes" fill="#82ca9d" name="PPRRD Vigentes" barSize={15}/>
      </BarChart>
    </ResponsiveContainer>
    
  )
)
};

export default MyBarChartpprrs;

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Dashboard = ({asistenciasdetalles={}}) => {
    const data = [
        { id: 1, periodo: 2017, pprrd: 7, pprrd_acumulado: 0, evar: 0, otros: 0 },
        { id: 2, periodo: 2018, pprrd: 44, pprrd_acumulado: 1, evar: 0, otros: 0 },
        { id: 3, periodo: 2019, pprrd: 50, pprrd_acumulado: 1, evar: 0, otros: 0 },
        { id: 4, periodo: 2020, pprrd: 53, pprrd_acumulado: 2, evar: 0, otros: 0 },
        { id: 5, periodo: 2021, pprrd: 58, pprrd_acumulado: 11, evar: 1, otros: 0 },
        { id: 6, periodo: 2022, pprrd: 110, pprrd_acumulado: 82, evar: 3, otros: 14 },
        { id: 7, periodo: 2023, pprrd: 135, pprrd_acumulado: 214, evar: 3, otros: 19 },
        { id: 8, periodo: 2024, pprrd: 101, pprrd_acumulado: 315, evar: 0, otros: 28 },
        { id: 8, periodo: 2025, pprrd: 2, pprrd_acumulado: 317, evar: 0, otros: 21 },
       
      ];
    return (
        <ResponsiveContainer width={'90%'} height={400} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <LineChart width={400} height={300} data={asistenciasdetalles}>
            <XAxis dataKey="periodo" />
            <YAxis dataKey=""></YAxis>                
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey='pprrd' stroke="blue" strokeWidth={2}></Line>
            <Line type="monotone" dataKey='pprrd_acumulado' stroke="orange" strokeWidth={2}></Line>
            <Line type="monotone" dataKey='evar' stroke="green" strokeWidth={2}></Line>
            <Line type="monotone" dataKey='otros'stroke='red' strokeWidth={2}></Line>
        </LineChart>
        </ResponsiveContainer>
    );
};

export default Dashboard;
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Dashboard = ({asistenciasdetalles={}}) => {    
    const data = [
        { id: 1, year: 2017, en_proceso: 200, aprobado: 575, cancelado: 823 },
        { id: 2, year: 2018, en_proceso: 256, aprobado: 485, cancelado: 823 },
        { id: 3, year: 2019, en_proceso: 315, aprobado: 675, cancelado: 823 },
        { id: 4, year: 2020, en_proceso: 345, aprobado: 675, cancelado: 823 },
        { id: 5, year: 2021, en_proceso: 712, aprobado: 876, cancelado: 678 },
        { id: 6, year: 2022, en_proceso: 123, aprobado: 478, cancelado: 765 },
        { id: 7, year: 2023, en_proceso: 234, aprobado: 567, cancelado: 899 },
        { id: 8, year: 2024, en_proceso: 234, aprobado: 567, cancelado: 850 },
       
      ];
      //console.log("dash Line: ", data);
      //console.log("dash Line: ", asistenciasdetalles);
    return (
           <ResponsiveContainer width={'90%'} height={400}>
            <LineChart width={400} height={300} data={asistenciasdetalles}>
                <XAxis dataKey="periodo" />
                <YAxis dataKey=""></YAxis>                
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey='en_proceso' stroke="blue" strokeWidth={2}></Line>
                <Line type="monotone" dataKey='aprobado' stroke="green" strokeWidth={2}></Line>
                <Line type="monotone" dataKey='vigente_acumulado'stroke='red' strokeWidth={2}></Line>
            </LineChart>            
            </ResponsiveContainer>
    );
};

export default Dashboard;
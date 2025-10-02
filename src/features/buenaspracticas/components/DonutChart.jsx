import { PieChart, Pie, Tooltip, Legend, Cell,ResponsiveContainer } from "recharts";
import { useState,useEffect } from 'react';


const data = [
  { name: "Capacitados", value: 1000 },
  { name: "No capacitados", value: 5000 },
  
];


const COLORS = ["#0088FE", "#FFBB28"];
//const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const DonutChart = () => {
  
  const [resumen, setResumen] = useState([]);  





  return (
    <ResponsiveContainer width="100%" height={460}>
    <PieChart width={450} height={450}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={120}  // Define el agujero del centro
        outerRadius={150} // Tamaño externo de la dona
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;

import { useState,useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


const CircularDos = ({ percentage, size = 300,title=''}) => {
  
 
  let data = [
    { name: "Filled", value: percentage },
    { name: "Remaining", value: 100-percentage },
  ];
  
  //const COLORS = ["#4CAF50", "#E0E0E0"];
  const COLORS = ["#8884d8", "#E0E0E0"];
  useEffect(() => {
  }, [percentage]);


  return (
    <>
     <h1 className="mb-4 mt-4  text-lg font-bold text-center">{title}</h1>
    <div className="mt-4 mx-auto relative flex items-center justify-center" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.30}
            outerRadius={size * 0.5}
            fill="#8884d8"
            paddingAngle={1}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute text-3xl font-bold">{percentage}%</div>
    </div>
    </>
  );
};

export default CircularDos

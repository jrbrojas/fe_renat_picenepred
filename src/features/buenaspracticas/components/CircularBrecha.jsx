import { useState,useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import axiosClient from "../../../axios-client";

const CircularBrecha = ({ percentage, size = 300,title='',ubigeo=0}) => {
  

  const [data, setData] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [avance, setAvance] = useState([]);
  

  useEffect(() => {
    const getResumen = async () =>{
      try {
   
               await axiosClient.get('/departamentos_pprrd_inicio/'+ubigeo)
              .then(({data}) => {
                const {pprrd,distritos}= data.data[0];
                setDistritos(distritos);
                setAvance(pprrd);
                console.log("porcentaje",pprrd/distritos*100);
                console.log(data.data);
                  setData((pprrd/distritos*100).toFixed(2));
                  
     
          })
          
      } catch (error) {
          console.log(error.message); 
      } finally {
       
      }
    }
    getResumen();
  
  }, [ubigeo]);
  
  let datos = [
    { name: "Filled", value: avance },
    { name: "Remaining", value: distritos },
  ];
  


  /*let datos = [
    { name: "Filled", value: distritos },
    { name: "Remaining", value: avance },
  ];*/
  
  //const COLORS = ["#4CAF50", "#E0E0E0"];
  const COLORS = ["#8884d8", "#E0E0E0"];
  useEffect(() => {
  }, [data]);


  return (
    <>
     <h1 className="mb-4 mt-4  text-lg font-bold text-center">BRECHA {title}</h1>
    <div className="mt-4 mx-auto relative flex items-center justify-center" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={datos}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.30}
            outerRadius={size * 0.5}
            fill="#8884d8"
            paddingAngle={1}
            dataKey="value"
          >
            {datos.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute text-3xl font-bold">{data}%</div>
    </div>
    </>
  );
};

export default CircularBrecha

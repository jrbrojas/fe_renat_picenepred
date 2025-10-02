import { useState,useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axiosClient from "../../../../axios-client";

const ApexChart = ({ubigeo}) => {

  let valores=[];
  let aniios=[];
  const [resumen, setResumen] = useState([]); 
  const [loading, setLoading] = useState(true);  

        useEffect(() => {
        const getResumen = async () =>{
            try {
              setLoading(true);
                await axiosClient.get('/fortalecimiento_periodo')
                    .then((response) => {
                      
                        setResumen(response.data.data);
                        setLoading(false);
                })
                
            } catch (error) {
                setError(error.message); 
            } finally {
             
            }
          }
        getResumen();
        
        }, [])
    
        useEffect(() => {
          resumen.map((d, k) => {
           console.log(d);
           valores.push()
           aniios.push(d[k].annio)
        });
        console.log("valores",valores);
        },
          [resumen]);

        const [state, setState] = useState({
      
          series: [{
            data:valores
          }],
          options: {
            chart: {
              type: 'bar',
              height: 300,
            },
            
            plotOptions: {
              bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true
                
                
              }
            },
            dataLabels: {
              enabled: true
            },
            xaxis: {
              categories: aniios,
              
            }
          },
        
        
      });


    return (
      <div>
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series}  type="bar" height={350} />
          </div>
        <div id="html-dist"></div>
      </div>
    );
  }

export default ApexChart;

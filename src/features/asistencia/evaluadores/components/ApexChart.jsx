import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
    const [state, setState] = useState({
      
        series: [{
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
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
            categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
              'United States', 'China', 'Germany'
            ],
            
          }
        },
      
      
    });

    

    return (
      <div>
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
          </div>
        <div id="html-dist"></div>
      </div>
    );
  }

export default ApexChart;

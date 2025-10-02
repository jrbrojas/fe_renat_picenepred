import { RadialBarChart, RadialBar } from "recharts";

const CircularPercentageChart = ({ percentage }) => {
  const data = [{ value: percentage }];
  
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <RadialBarChart
        width={160}
        height={160}
        cx={80}
        cy={80}
        innerRadius={60}
        outerRadius={80}
        barSize={10}
        data={data}
        startAngle={90}
        endAngle={90 + (percentage * 3.6)}
      >
        <RadialBar minAngle={15} clockWise dataKey="value" fill="#4CAF50" />
      </RadialBarChart>
      <span className="absolute text-xl font-bold">{percentage}%</span>
    </div>
  );
};

export default CircularPercentageChart;

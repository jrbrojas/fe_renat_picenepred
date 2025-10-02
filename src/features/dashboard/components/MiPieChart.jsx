import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const data = [
  { name: "Enero", value: 400 },
  { name: "Febrero", value: 300 },
  { name: "Marzo", value: 500 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const MiPieChart = () => {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default MiPieChart;

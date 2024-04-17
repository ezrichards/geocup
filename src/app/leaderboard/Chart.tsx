"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PlayerSeries } from "../parser/data";
const colors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#d0ed57",
  "#a4de6c",
  "#82ca9d",
];
export const Chart = ({ data }: { data: PlayerSeries[] }) => {
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <LineChart
      width={700}
      height={500}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" type="category" allowDuplicatedCategory={false} />
      <YAxis dataKey="totalScore" />
      <Tooltip />
      <Legend />
      {data.map((s, index) => (
        <Line
          dataKey="totalScore"
          data={s.data}
          name={s.playerName}
          key={s.playerName}
          stroke={colors[index % colors.length]}
        />
      ))}
    </LineChart>
    // </ResponsiveContainer>
  );
};

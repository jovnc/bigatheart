"use client";
import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { minsPerDemographic } from "@utils/helpers";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
const COLORS = [
  "#FFC0CB",
  "#F3CFC6",
  "#C9A9A6",
  "#FAA0A0",
  "#E37383",
  "#CA9E9E",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function GenderPieChart({ events }) {
  const cleanedData = minsPerDemographic(events, "gender");

  return (
    <Card className="flex w-full border-l-4 border-yellow-200 h-full">
      <CardBody>
        <Flex flexDir="column" gap={8}>
          <Text fontWeight="bold" fontSize="sm" align="center">
            Proportion of Gender by volunteering minutes
          </Text>

          {events.length === 0 && (
            <Text fontSize="sm">No one has attended any event</Text>
          )}
          {events.length > 0 && (
            <ResponsiveContainer width="95%" height={300}>
              <PieChart>
                <Legend />
                <Tooltip />
                <Pie
                  data={cleanedData}
                  dataKey="minutes"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  fill="#8884d8"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {cleanedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
}

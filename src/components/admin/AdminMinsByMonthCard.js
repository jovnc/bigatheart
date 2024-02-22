"use client";
import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { minsPerDemographic, minsPerMonthGraph } from "@utils/helpers";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AdminMinsByMonthCard({ events }) {
  const cleanedData = minsPerMonthGraph(events);

  return (
    <Card className="flex w-full border-l-4 border-blue-200 h-full">
      <CardBody>
        <Flex flexDir="column" gap={8}>
          <Text fontWeight="bold" fontSize="sm" align="center">
            Total Mins Volunteered by Month
          </Text>

          {events.length === 0 && (
            <Text fontSize="sm">No one has attended any event</Text>
          )}
          {events.length > 0 && (
            <ResponsiveContainer width="95%" height={400}>
              <BarChart
                data={cleanedData}
                margin={{
                  top: 5,
                  right: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="minutes"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="green" stroke="blue" />}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
}

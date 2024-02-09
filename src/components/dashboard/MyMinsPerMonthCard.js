"use client";
import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { minsPerMonthGraph } from "@utils/helpers";
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

export default function MyMinsPerMonthCard({ events }) {
  const eventsPerMonth = minsPerMonthGraph(events);

  return (
    <Card className="flex w-full mt-5 border-l-4 bg-opacity-50 border-blue-200 bg-stone-50">
      <CardBody>
        <Flex flexDir="column" gap={8}>
          <Text fontWeight="bold">Minutes Volunteered per month</Text>
          {events.length === 0 && (
            <Text fontSize="sm">You have not attended any events</Text>
          )}
          {events.length > 0 && (
            <ResponsiveContainer width="95%" height={400}>
              <BarChart
                data={eventsPerMonth}
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

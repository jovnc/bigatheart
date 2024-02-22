"use client";
import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { topCategoriesGraph } from "@utils/helpers";
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

export default function TopCategoriesCard({ events }) {
  const minsPerCategory = topCategoriesGraph(events);

  return (
    <Card className="flex w-full mt-5 border-l-4 bg-opacity-50 border-red-100 bg-stone-50">
      <CardBody>
        <Flex flexDir="column" gap={8}>
          <Text fontWeight="bold" fontSize="sm" align="center">
            Minutes Volunteered By Category
          </Text>
          {events.length === 0 && (
            <Text fontSize="sm">No events attended yet.</Text>
          )}
          {events.length > 0 && (
            <ResponsiveContainer width="95%" height={400}>
              <BarChart
                data={minsPerCategory}
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
                  fill="#F3CFC6"
                  activeBar={<Rectangle fill="#E37383" stroke="blue" />}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
}

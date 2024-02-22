"use client";
import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa6";
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

export default function TopCategoriesPieChart({ userCleaned }) {
  return (
    <Card className="flex w-full border-l-4 border-pink-200 h-full">
      <CardBody>
        <Flex flexDir="column" gap={4}>
          <Flex className="w-full bg-pink-200 p-3 shadow-lg rounded-lg">
            <Text fontSize="sm">
              <FaStar className="inline mr-2" />
              Most Popular Category: {userCleaned[0].name}
            </Text>
          </Flex>

          <Text fontWeight="bold" fontSize="sm" align="center">
            Top Categories among Volunteers
          </Text>

          {userCleaned.length === 0 && (
            <Text fontSize="sm">No one has attended any event</Text>
          )}
          {userCleaned.length > 0 && (
            <ResponsiveContainer width="95%" height={400}>
              <BarChart
                data={userCleaned}
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
                  dataKey="count"
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

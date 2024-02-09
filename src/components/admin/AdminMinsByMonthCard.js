"use client";
import { Card, CardBody, Flex, Text } from "@chakra-ui/react";

export default function AdminMinsByMonthCard() {
  return (
    <Card className="flex w-full border-l-4 border-blue-200">
      <CardBody>
        <Flex>
          <Text fontWeight="bold">Total Hours Volunteered by Month</Text>
        </Flex>
      </CardBody>
    </Card>
  );
}

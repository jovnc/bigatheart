import { Flex, Text } from "@chakra-ui/react";
import { MultiSelect } from "react-multi-select-component";

export default function DashboardFilter({ options, show, setShow }) {
  return (
    <Flex justify="space-between" gap={8}>
      <Text fontWeight="bold" pr={4}>
        Customise Dashboard
      </Text>
      <MultiSelect
        options={options}
        className="w-[619px]"
        value={show}
        onChange={setShow}
      />
    </Flex>
  );
}

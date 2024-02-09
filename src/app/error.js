"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function error({ error, reset }) {
  useEffect(() => {
    console.log(error);
    toast.error(error.message);
  }, [error]);

  return (
    <Flex className="w-screen p-5 mx-5" flexDir="column" align="center" gap={4}>
      <Box>
        <Text fontWeight="bold">
          ERROR 404: Error loading page. Please try again!
        </Text>
      </Box>
      <Box>
        <Text>Message: {error.message}</Text>
      </Box>
      <Box>
        <button
          onClick={() => location.reload()}
          className="border border-black rounded-lg hover:text-white hover:bg-black font-bold p-2 text-sm mt-3"
        >
          Try again
        </button>
      </Box>
    </Flex>
  );
}

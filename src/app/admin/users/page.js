"use client";
import { getAllUsers } from "@actions/userActions";
import { Divider, Flex, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import Container from "@components/Container";
import UserInfoRow from "@components/admin/UserInfoRow";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { users } = await getAllUsers();
        setData(users);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error retrieving user information, please try again");
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <Spinner />;
  if (!data) return <Spinner />;

  return (
    <Container>
      <Flex flexDir="column" gap={4}>
        <Text className="text-center" fontWeight="medium">
          User Information Summary
        </Text>
        <Divider />
        <Grid templateColumns="0.5fr 1fr 1fr 2fr 0.5fr" gap={2}>
          <GridItem></GridItem>
          <GridItem>
            <Text fontSize="sm" fontWeight="medium">
              Name
            </Text>
          </GridItem>

          <GridItem>
            <Text fontSize="sm" fontWeight="medium">
              Phone
            </Text>
          </GridItem>
          <GridItem>
            <Text fontSize="sm" fontWeight="medium">
              Email
            </Text>
          </GridItem>
          <GridItem></GridItem>
        </Grid>
        {data &&
          data.map((user, i) => {
            return <UserInfoRow key={i} user={user} />;
          })}
      </Flex>
    </Container>
  );
}

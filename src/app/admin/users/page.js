"use client";
import { getAllUsers } from "@actions/userActions";
import {
  Divider,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Container from "@components/Container";
import UserInfoRow from "@components/admin/UserInfoRow";
import { generateExcel } from "@utils/helpers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";

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

  const handleDownload = () => {
    const excelBlob = generateExcel(data, "User Information");

    const url = URL.createObjectURL(excelBlob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "user_info.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
          <Tooltip label="Export as XLSX">
            <GridItem>
              <FaDownload
                onClick={handleDownload}
                className="hover:shadow-lg hover:cursor-pointer"
              />
            </GridItem>
          </Tooltip>
        </Grid>
        {data &&
          data.map((user, i) => {
            return <UserInfoRow key={i} user={user} />;
          })}
      </Flex>
    </Container>
  );
}

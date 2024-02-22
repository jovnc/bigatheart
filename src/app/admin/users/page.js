"use client";
import { getAllUsers } from "@actions/userActions";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Container from "@components/Container";
import SearchBox from "@components/SearchBox";
import UserInfoRow from "@components/admin/UserInfoRow";
import { generateExcel } from "@utils/helpers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";

export default function page() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchUser, setSearchUser] = useState("");

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

  console.log(data);
  // filter users
  const filteredData = data.filter((user) => {
    const name = `${user.first_name} ${user.last_name}`.toUpperCase();
    const searchUserUpper = searchUser.toUpperCase();
    return (
      name.includes(searchUserUpper) ||
      user.phone.includes(searchUserUpper) ||
      user.email.toUpperCase().includes(searchUserUpper)
    );
  });

  return (
    <Container>
      <Flex flexDir="column" gap={4}>
        <Text className="text-center" fontWeight="medium">
          User Information Summary
        </Text>
        <Divider />
        <Flex>
          <SearchBox searchUser={searchUser} setSearchUser={setSearchUser} />
        </Flex>
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
              <Flex justify="end">
                <FaDownload
                  onClick={handleDownload}
                  className="hover:shadow-lg hover:cursor-pointer"
                />
              </Flex>
            </GridItem>
          </Tooltip>
        </Grid>

        {!filteredData ||
          (filteredData?.length == 0 && (
            <Text fontSize="sm">No such users exist</Text>
          ))}
        {filteredData &&
          filteredData.map((user, i) => {
            return <UserInfoRow key={i} user={user} />;
          })}
      </Flex>
    </Container>
  );
}

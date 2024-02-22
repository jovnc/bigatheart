import {
  Avatar,
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function WelcomeAdminCard({ displayName, avatar }) {
  return (
    <Card className="bg-rose-100 bg-opacity-50 p-5 hover:shadow-lg">
      <CardBody>
        <Box>
          <Grid templateColumns="1.5fr 1fr">
            <GridItem>
              <Text fontSize="md">Welcome back,</Text>
              <Heading size="xl">{displayName}</Heading>
              <Text fontSize="sm" className="pt-2">
                Admin Dashboard
              </Text>
            </GridItem>
            <GridItem
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                size="xl"
                src={avatar}
                alt="profile photo"
                className="ring-2 ring-gray-300"
              />
            </GridItem>
          </Grid>
        </Box>
      </CardBody>
    </Card>
  );
}

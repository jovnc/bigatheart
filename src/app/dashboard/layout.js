import { Grid, GridItem } from "@chakra-ui/react";
import DashboardNav from "@components/nav/DashboardNav";

import { getUserDetails } from "@actions/authActions";

export default async function RootLayout({ children }) {
  const res = await getUserDetails();

  if (!res) return null;
  const { displayName, avatar, role } = res;

  return (
    <div className="w-full">
      <Grid templateColumns="1fr 2.5fr" gap={8}>
        <GridItem>
          <DashboardNav displayName={displayName} avatar={avatar} role={role} />
          {/* <DashboardNav /> */}
        </GridItem>
        <GridItem>{children}</GridItem>
      </Grid>
    </div>
  );
}

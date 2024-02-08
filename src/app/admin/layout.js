import { getUserDetails } from "@actions/authActions";
import { Grid, GridItem } from "@chakra-ui/react";
import AdminDashboardNav from "@components/nav/AdminDashboardNav";

export default async function RootLayout({ children }) {
  const res = await getUserDetails();

  // destructure res object
  const { displayName, avatar, role } = res;

  return (
    <div className="w-full">
      <Grid templateColumns="1fr 2.5fr" gap={8}>
        <GridItem>
          <AdminDashboardNav
            displayName={displayName}
            avatar={avatar}
            role={role}
          />
          {/* <AdminDashboardNav /> */}
        </GridItem>
        <GridItem>{children}</GridItem>
      </Grid>
    </div>
  );
}

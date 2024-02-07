import { getUserDetails } from "@actions/authActions";
import { Grid, GridItem } from "@chakra-ui/react";
import AdminDashboardNav from "@components/nav/AdminDashboardNav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// TODO: make admin emails persistent and secure
const ADMIN_EMAIL = ["edtokens@gmail.com", "jjiiaaxxiinn@gmail.com"];

export default async function RootLayout({ children }) {
  const res = await getUserDetails();

  // handle case: user not signed in
  if (!res) redirect("/");

  // destructure res object
  const { displayName, avatar, role } = res;
  if (role !== "Admin") redirect("/");

  return (
    <div className="w-full">
      <Grid templateColumns="1fr 2.5fr" gap={8}>
        <GridItem>
          <AdminDashboardNav
            displayName={displayName}
            avatar={avatar}
            role={role}
          />
        </GridItem>
        <GridItem>{children}</GridItem>
      </Grid>
    </div>
  );
}

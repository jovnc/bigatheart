import { Grid, GridItem } from "@chakra-ui/react";
import AdminDashboardNav from "@components/nav/AdminDashboardNav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// TODO: make admin emails persistent and secure
const ADMIN_EMAIL = ["edtokens@gmail.com", "jjiiaaxxiinn@gmail.com"];

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!ADMIN_EMAIL.includes(session.user.email)) {
    return redirect("/");
  }

  return (
    <div className="w-full">
      <Grid templateColumns="1fr 2fr" gap={8}>
        <GridItem>
          <AdminDashboardNav />
        </GridItem>
        <GridItem>{children}</GridItem>
      </Grid>
    </div>
  );
}

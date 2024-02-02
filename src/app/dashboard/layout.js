import { Grid, GridItem } from "@chakra-ui/react";
import DashboardNav from "@components/nav/DashboardNav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function RootLayout({ children }) {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return redirect("/auth/login");
	}

	return (
		<div className="w-full">
			<Grid templateColumns="1fr 2fr" gap={8}>
				<GridItem>
					<DashboardNav />
				</GridItem>
				<GridItem>{children}</GridItem>
			</Grid>
		</div>
	);
}

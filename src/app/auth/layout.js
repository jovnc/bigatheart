import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) {
		return redirect("/dashboard");
	}

	return (
		<>
			<div>{children}</div>
		</>
	);
}

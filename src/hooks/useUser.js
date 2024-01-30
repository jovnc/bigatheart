import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export function useUser() {
	const supabase = createClientComponentClient();
	const [isAuthenticated, setIsAuthenticated] = useState();
	useEffect(() => {
		const fetchUserData = async () => {
			const user = await supabase.auth.getUser();
			if (user.data.user?.role) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		};
		fetchUserData();
	}, []);

	return [isAuthenticated];
}

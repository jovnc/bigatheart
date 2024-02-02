import { getUserDetails } from "@actions/authActions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useUser() {
	const [displayName, setDisplayName] = useState("");
	const [role, setRole] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const { displayName, role } = await getUserDetails();
				setDisplayName(displayName);
				setRole(role);
			} catch (error) {
				toast.error(error.message);
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return { displayName, role, isLoading };
}

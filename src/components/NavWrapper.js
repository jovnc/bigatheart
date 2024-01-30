"use client";

import { AuthContextProvider } from "@context/AuthContext";
import Nav from "./Nav";

function NavWrapper() {
	return (
		<AuthContextProvider>
			<Nav />
		</AuthContextProvider>
	);
}

export default NavWrapper;

"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [session, setSession] = useState(null);
	const supabase = createClientComponentClient();

	useEffect(() => {
		const subscription = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_OUT") {
				setSession(null);
			} else if (session) {
				setSession(session);
			}
		});

		return () => {
			subscription.data.subscription.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
	);
};

export function useSession() {
	const context = useContext(AuthContext);
	if (context == undefined) {
		throw new Error("AuthContext was used outside of AuthContextProvider");
	}
	return context;
}

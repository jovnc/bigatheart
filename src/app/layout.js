import "@styles/globals.css";
import NavWrapper from "@components/NavWrapper";
import { Toaster } from "react-hot-toast";

export const metadata = {
	title: "Hack4Good Big At Heart",
	description: "Hack4Good Big At Heart",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<div className="main">
					<div className="gradient" />
				</div>
				<main className="app">
					<Toaster position="top-center" />
					<NavWrapper />
					{children}
				</main>
			</body>
		</html>
	);
}

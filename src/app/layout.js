import Footer from "@components/Footer";
import Nav from "@components/Nav";
import { AuthContextProvider } from "@context/AuthContext";
import "@styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
	title: "Hack4Good Big At Heart",
	description: "Hack4Good Big At Heart",
};

export default async function RootLayout({ children }) {
	return (
		<AuthContextProvider>
			<html lang="en">
				<body className="flex flex-col min-h-screen">
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app w-full">
						<Toaster position="top-center" />
						<Nav />
						{children}
					</main>
					<div className="flex-grow"></div>

					<Footer />
				</body>
			</html>
		</AuthContextProvider>
	);
}

import Footer from "@components/Footer";
import Nav from "@components/nav/Nav";
import { AuthContextProvider } from "@context/AuthContext";
import "@styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "@context/ChakraContext";

export const metadata = {
	title: "Hack4Good Big At Heart",
	description: "Hack4Good Big At Heart",
};

export default async function RootLayout({ children }) {
	return (
		<AuthContextProvider>
			<html lang="en">
				<head>
					<link rel="icon" href="/assets/images/logo.png" />
				</head>
				<body className="flex flex-col min-h-screen">
					<Providers>
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
					</Providers>
				</body>
			</html>
		</AuthContextProvider>
	);
}

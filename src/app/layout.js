import "@styles/globals.css";
import Nav from "@components/Nav";

export const metadata = {
	title: "Big At Heart",
	description: "Hack4Good 2024 Big At Heart Volunteer Management System",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<div className="main">
					<div className="gradient" />
				</div>

				<main className="app">
					<Nav />
					{children}
				</main>
			</body>
		</html>
	);
}

import Footer from "@components/Footer";
import Nav from "@components/nav/Nav";
import "@styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "@context/ChakraContext";
import { EdgeStoreProvider } from "@context/EdgeStoreContext";
import { checkLoggedIn } from "@actions/authActions";

export const metadata = {
  title: "Hack4Good Big At Heart",
  description: "Hack4Good Big At Heart",
};

export default async function RootLayout({ children }) {
  const isLoggedIn = await checkLoggedIn();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo.png" />
      </head>
      <body className="flex flex-col min-h-screen">
        <EdgeStoreProvider>
          <Providers>
            <div className="main">
              <div className="gradient" />
            </div>
            <main className="app w-full">
              <Toaster position="top-center" />
              <Nav isLoggedIn={isLoggedIn} />
              {children}
            </main>
            <div className="flex-grow"></div>

            <Footer />
          </Providers>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}

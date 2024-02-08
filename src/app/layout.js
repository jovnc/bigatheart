import Footer from "@components/Footer";
import "@styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "@context/ChakraContext";
import { EdgeStoreProvider } from "@context/EdgeStoreContext";

import NavWrapper from "@components/NavWrapper";

export const metadata = {
  title: "Hack4Good Big At Heart",
  description: "Hack4Good Big At Heart",
};

export default async function RootLayout({ children }) {
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
              <NavWrapper />
              {children}
            </main>
            <div className="flex-grow"></div>
            <div className="app w-full">
              <Footer />
            </div>
          </Providers>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}

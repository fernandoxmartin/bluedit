import "./globals.css";
import Header from "./components/header/header";
import Providers from "./providers";
import Nav from "./components/mobile/nav";
import CreateCheck from "./components/mobile/createCheck";
import Toast from "./components/toast";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export default function RootLayout({ modal, children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-light-bg dark:bg-dark-bg h-full w-full ${inter.className}`}
      >
        <Providers>
          <Header />
          <Nav />
          <CreateCheck />
          <main className="m-auto w-full max-w-[1000px] mt-2 lg:mt-6">
            {children}
          </main>
          {modal}
          <Toast />
        </Providers>
      </body>
    </html>
  );
}

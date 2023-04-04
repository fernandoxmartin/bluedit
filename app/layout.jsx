import "./globals.css";
import Header from "./components/header/header";
import Providers from "./providers";
import Nav from "./components/mobile/nav";
import CreateButton from "./components/mobile/createButton";
import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-light-bg dark:bg-dark-bg h-full w-full ${inter.className}`}
      >
        <Providers>
          <Header />
          <Nav />
          <CreateButton />
          <main className="grid lg:grid-cols-4 gap-2 max-w-[1200px] w-full mt-2">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Inter } from "@next/font/google";
import { GlobalProvider } from "../context/global-context";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <main className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class">
          <GlobalProvider>
            <Component {...pageProps} />
          </GlobalProvider>
        </ThemeProvider>
      </main>
    </SessionProvider>
  );
}

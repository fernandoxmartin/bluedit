"use client";

import { ThemeProvider } from "next-themes";
import { GlobalProvider } from "./context/store";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export const QueryWrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class">
      <GlobalProvider>
        <QueryWrapper>
          <SessionProvider>{children}</SessionProvider>
        </QueryWrapper>
      </GlobalProvider>
    </ThemeProvider>
  );
}

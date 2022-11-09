import type { AppProps } from "next/app";
import { createContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavBar } from "../components/NavBar";
import "../styles/globals.css";

type AppContextState = {};
export const AppContext = createContext<AppContextState | null>(null);

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: unknown }>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{}}>
        <NavBar />
        <Component {...pageProps} />
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

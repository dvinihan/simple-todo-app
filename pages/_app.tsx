import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavBar } from "../components/NavBar";
import "../styles/globals.css";

type AppContextState = {
  pageTitle: string;
  setPageTitle: (title: string) => void;
  hrefStack: string[];
  addHrefToStack: (href: string) => void;
  removeLastHrefFromStack: () => void;
  resetHrefStack: () => void;
};
export const AppContext = createContext<AppContextState | null>(null);

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: unknown }>) {
  const queryClient = new QueryClient();

  const [pageTitle, setPageTitle] = useState("Rooms");
  const [hrefStack, setHrefStack] = useState<AppContextState["hrefStack"]>([]);

  const addHrefToStack = (href: string) => setHrefStack([...hrefStack, href]);
  const removeLastHrefFromStack = () => setHrefStack(hrefStack.slice(0, -1));
  const resetHrefStack = () => setHrefStack([]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          pageTitle,
          setPageTitle,
          hrefStack,
          addHrefToStack,
          removeLastHrefFromStack,
          resetHrefStack,
        }}
      >
        <NavBar />
        <Component {...pageProps} />
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { CANCEL_ROUTE_CHANGE_ERROR_MESSAGE } from "../constants";
import { AppContextProvider } from "../context/AppContext";
import { AppReducerActions } from "../context/types";
import { useAppContext } from "../context/use-app-context";
import "../styles/globals.css";

const RouteChangeWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  const handleRouteChangeStart = useCallback(
    (url: string) => {
      console.log("vinihan - handling", state.hasChanges);
      if (state.hasChanges) {
        dispatch({
          type: AppReducerActions.OPEN_DISCARD_MODAL_ACTION,
          payload: {
            redirectUrl: url,
          },
        });
        router.events.emit("routeChangeError");
        throw CANCEL_ROUTE_CHANGE_ERROR_MESSAGE;
      }
    },
    [dispatch, router.events, state.hasChanges]
  );

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChangeStart);
    return () => router.events.off("routeChangeStart", handleRouteChangeStart);
  }, [dispatch, handleRouteChangeStart, router.events, state.hasChanges]);

  return <>{children}</>;
};

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: unknown }>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <RouteChangeWrapper>
          <Component {...pageProps} />
        </RouteChangeWrapper>
      </AppContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

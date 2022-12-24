import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const withQueryClient = (jsx: ReactNode) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{jsx}</QueryClientProvider>;
};

import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const renderWithQueryClient = (jsx: ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{jsx}</QueryClientProvider>
  );
};

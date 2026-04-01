import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as JotaiProvider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Global, ThemeProvider } from "@emotion/react";
import App from "./App.jsx";
import { globalStyles } from "./styles/global";
import { theme } from "./styles/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {},
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles} />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </JotaiProvider>
    </QueryClientProvider>
  </StrictMode>,
);

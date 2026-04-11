import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as JotaiProvider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Global, ThemeProvider } from "@emotion/react";
import App from "./App.jsx";
import { globalStyles } from "./styles/global";
import { theme } from "./styles/theme";

import { ReactLenis } from "@studio-freight/react-lenis";

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
  <QueryClientProvider client={queryClient}>
    <JotaiProvider>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <BrowserRouter>
          <ReactLenis
            root
            options={{
              lerp: 0.1, // 부드러움 정도
              duration: 1.2, // 스크롤이 멈추기까지의 시간
              smoothWheel: true,
            }}>
            <App />
          </ReactLenis>
        </BrowserRouter>
      </ThemeProvider>
    </JotaiProvider>
  </QueryClientProvider>,
);

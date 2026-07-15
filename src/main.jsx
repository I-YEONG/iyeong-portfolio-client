import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as JotaiProvider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Global } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import App from "./App.jsx";
import { globalStyles } from "./styles/global";
import { theme } from "./styles/theme";

const muiTheme = createTheme({
  palette: {
    mode: "light",
  },
  ...theme,
});

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

export function LenisProvider({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });

    // expose Lenis instance for global programmatic scrolling
    // 다른 훅에서 `window.lenis`로 접근해 스크롤을 제어할 수 있도록 함
    try {
      // eslint-disable-next-line no-undef
      window.lenis = lenis;
    } catch (e) {
      // ignore
    }

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    let refreshQueued = false;
    const refreshLenis = () => {
      if (refreshQueued) return;
      refreshQueued = true;
      requestAnimationFrame(() => {
        refreshQueued = false;
        lenis.resize();
        ScrollTrigger.refresh();
      });
    };

    const handleCustomResize = () => {
      refreshLenis();
    };

    const handleImageLoad = (event) => {
      if (event.target?.tagName === "IMG") {
        refreshLenis();
      }
    };

    const observer = new MutationObserver(() => {
      refreshLenis();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("lenis:resize", handleCustomResize);
    window.addEventListener("load", refreshLenis);
    document.addEventListener("load", handleImageLoad, true);

    return () => {
      gsap.ticker.remove(updateLenis);
      observer.disconnect();
      window.removeEventListener("lenis:resize", handleCustomResize);
      window.removeEventListener("load", refreshLenis);
      document.removeEventListener("load", handleImageLoad, true);
      lenis.destroy();
    };
  }, []);

  return children;
}

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <JotaiProvider>
      <ThemeProvider theme={muiTheme}>
        <Global styles={globalStyles} />
        <BrowserRouter>
          <LenisProvider>
            <App />
          </LenisProvider>
        </BrowserRouter>
      </ThemeProvider>
    </JotaiProvider>
  </QueryClientProvider>,
);

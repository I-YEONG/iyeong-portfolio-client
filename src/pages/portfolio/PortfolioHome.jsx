import { HomeHero, HomeOverview } from "@/features/portfolio/home/components";
import { Header } from "@/layouts";

const PortfolioHome = () => {
  return (
    <main>
      <Header themeCode="dark" />
      <div css={{ display: "flex", flexDirection: "column", gap: "min(10vh, 120px)" }}>
        <HomeHero />
        <HomeOverview />
        <div css={{ height: "100vh", backgroundColor: "gray" }}></div>
      </div>
    </main>
  );
};
export default PortfolioHome;

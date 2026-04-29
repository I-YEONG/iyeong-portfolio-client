import { HomeHero, HomeOverview, HomePortfolio, HomeStack, HomeVision } from "@/features/portfolio/home/components";
import { Header } from "@/layouts";

const PortfolioHome = () => {
  return (
    <main>
      <Header themeCode="dark" />
      <div css={{ display: "flex", flexDirection: "column", gap: "10vh" }}>
        <HomeHero />
        <HomeOverview />
        <HomePortfolio />
        <HomeStack />
        <HomeVision />
        <div css={{ height: "100vh", backgroundColor: "gray" }}></div>
      </div>
    </main>
  );
};
export default PortfolioHome;

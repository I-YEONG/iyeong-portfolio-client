import { HomeHero, HomeOverview, HomePortfolio } from "@/features/portfolio/home/components";
import { Header } from "@/layouts";

const PortfolioHome = () => {
  return (
    <main>
      <Header themeCode="dark" />
      <div css={{ display: "flex", flexDirection: "column", gap: "10vh" }}>
        <HomeHero />
        <HomeOverview />
        <HomePortfolio />
        <div css={{ height: "100vh", backgroundColor: "gray" }}></div>
      </div>
    </main>
  );
};
export default PortfolioHome;

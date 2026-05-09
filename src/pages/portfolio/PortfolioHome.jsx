import { HomeHero, HomeOverview, HomePortfolio, HomeStack, HomeVision } from "@/features/portfolio/home/components";
import { Footer, Header } from "@/layouts";

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
        <Footer />
      </div>
    </main>
  );
};
export default PortfolioHome;

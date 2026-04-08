import { HomeHero } from "@/features/portfolio/home/components";
import { Header } from "@/layouts";

const PortfolioHome = () => {
  return (
    <main>
      <Header themeCode="dark" />
      <HomeHero />
      <div css={{ height: "100vh", backgroundColor: "gray" }}></div>
    </main>
  );
};
export default PortfolioHome;

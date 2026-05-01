import { AboutBanner, AboutHero, AboutTechnical } from "@/features/portfolio/about/components";
import { Footer, Header } from "@/layouts";

const PortfolioAbout = () => {
  return (
    <main>
      <Header />
      <div css={{ display: "flex", flexDirection: "column", gap: "10vh" }}>
        <AboutHero />
        <AboutBanner />
        <AboutTechnical />
        <section css={{ backgroundColor: "#e8e8e8", minHeight: "100vh" }}></section>
        <Footer />
      </div>
    </main>
  );
};
export default PortfolioAbout;

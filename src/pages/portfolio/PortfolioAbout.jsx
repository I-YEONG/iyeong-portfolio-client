import { AboutBanner, AboutCertifications, AboutExp, AboutHero, AboutTechnical } from "@/features/portfolio/about/components";
import { Footer, Header } from "@/layouts";

const PortfolioAbout = () => {
  return (
    <main>
      <Header />
      <div css={{ display: "flex", flexDirection: "column", gap: "10vh" }}>
        <AboutHero />
        <AboutBanner />
        <AboutTechnical />
        <AboutCertifications />
        <AboutExp />
        <Footer />
      </div>
    </main>
  );
};
export default PortfolioAbout;

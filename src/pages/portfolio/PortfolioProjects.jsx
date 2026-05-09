import { ProjectsHero } from "@/features/portfolio/projects/components";
import { Footer, Header } from "@/layouts";

const PortfolioProjects = () => {
  return (
    <main>
      <Header themeCode="dark" />
      <div css={{ display: "flex", flexDirection: "column", gap: "10vh" }}>
        <ProjectsHero />
        <div css={{ width: "100%", height: "80vh", backgroundColor: "gray" }}></div>
        <Footer />
      </div>
    </main>
  );
};
export default PortfolioProjects;

import { ProjectList, ProjectsHero } from "@/features/portfolio/projects/components";
import { Footer, FullCenterLayout, Header } from "@/layouts";

const PortfolioProjects = () => {
  return (
    <main>
      <Header themeCode="dark" />
      <div css={{ display: "flex", flexDirection: "column", gap: "10vh" }}>
        <ProjectsHero />
        <ProjectList />
        <Footer />
      </div>
    </main>
  );
};
export default PortfolioProjects;

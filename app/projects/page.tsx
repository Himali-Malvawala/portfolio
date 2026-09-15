import { PageLayout } from "../components/PageLayout";
import { WorkInProgress } from "../components/WorkInProgress";

export default function Projects() {
  return (
    <PageLayout pageTitle="Projects" active="projects">
      <WorkInProgress message="the projects are getting a redesign, promise :)" />
    </PageLayout>
  );
}

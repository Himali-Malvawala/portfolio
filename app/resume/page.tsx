import { PageLayout } from "../components/PageLayout";
import { WorkInProgress } from "../components/WorkInProgress";

export default function Resume() {
  return (
    <PageLayout pageTitle="Resume" active="resume">
      <WorkInProgress message="the resume is getting a redesign, promise :)" />
    </PageLayout>
  );
}

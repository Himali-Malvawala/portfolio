import { PageLayout } from "../components/PageLayout";
import { WorkInProgress } from "../components/WorkInProgress";

export default function Photos() {
  return (
    <PageLayout pageTitle="Photos" active="stills">
      <WorkInProgress />
    </PageLayout>
  );
}

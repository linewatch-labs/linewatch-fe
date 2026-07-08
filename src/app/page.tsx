import { fetchDashboard } from "@/features/linewatch/api";
import { LinewatchDashboard } from "@/features/linewatch/linewatch-dashboard";

const Page = async () => {
  const dashboard = await fetchDashboard();

  return <LinewatchDashboard dashboard={dashboard} />;
};

export default Page;

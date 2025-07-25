import { useDashboardTab } from "@/app/common/store/store";
import DashboardHeader from "@/components/__moleculas/DashboardHeader/DashboardHeader";
import DashboardNavigation from "@/components/__moleculas/DashboardNavigation/DashboardNavigation";
import DashboardTabsSyncer from "@/components/__moleculas/DashboardTabsSyncer/DashboardTabsSyncer";
import OverviewTab from "@/components/__moleculas/OverviewTab/OverviewTab";
import React from "react";

export default function CompanyDashboardBody() {
  const activeTab = useDashboardTab((state) => state.activeTab);

  return (
    <>
      <div className="min-h-screen w-full bg-gray-900">
        <DashboardTabsSyncer />
        <DashboardHeader />
        <DashboardNavigation />
        {activeTab === "overview" && <OverviewTab />}
      </div>
    </>
  );
}

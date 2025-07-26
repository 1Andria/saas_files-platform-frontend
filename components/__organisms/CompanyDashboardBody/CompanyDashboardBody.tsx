import { useDashboardTab } from "@/app/common/store/store";
import CompanyProfileTab from "@/components/__moleculas/CompanyProfileTab/CompanyProfileTab";
import DashboardHeader from "@/components/__moleculas/DashboardHeader/DashboardHeader";
import DashboardNavigation from "@/components/__moleculas/DashboardNavigation/DashboardNavigation";
import DashboardTabsSyncer from "@/components/__moleculas/DashboardTabsSyncer/DashboardTabsSyncer";
import EmployeeTab from "@/components/__moleculas/EmployeeTab/EmployeeTab";
import FilesTab from "@/components/__moleculas/FilesTab/FilesTab";
import OverviewTab from "@/components/__moleculas/OverviewTab/OverviewTab";
import React from "react";

export default function CompanyDashboardBody() {
  const activeTab = useDashboardTab((state) => state.activeTab);

  return (
    <>
      <div className="min-h-screen w-full bg-gray-900 pb-[50px]">
        <DashboardTabsSyncer />
        <DashboardHeader />
        <DashboardNavigation />
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "employees" && <EmployeeTab />}
        {activeTab === "files" && <FilesTab />}
        {activeTab === "profile" && <CompanyProfileTab />}
      </div>
    </>
  );
}

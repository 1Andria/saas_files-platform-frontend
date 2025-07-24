import CompaniInfoFullGrid from "@/components/__moleculas/CompaniInfoFullGrid/CompaniInfoFullGrid";
import CompanyInfoCard from "@/components/__moleculas/CompanyInfoCard/CompanyInfoCard";
import DashboardHeader from "@/components/__moleculas/DashboardHeader/DashboardHeader";
import DashboardNavigation from "@/components/__moleculas/DashboardNavigation/DashboardNavigation";
import DashboardTabsSyncer from "@/components/__moleculas/DashboardTabsSyncer/DashboardTabsSyncer";
import React from "react";

export default function CompanyDashboardBody() {
  return (
    <>
      <div className="min-h-screen w-full bg-gray-900">
        <DashboardTabsSyncer />
        <DashboardHeader />
        <DashboardNavigation />
        <CompaniInfoFullGrid />
      </div>
    </>
  );
}

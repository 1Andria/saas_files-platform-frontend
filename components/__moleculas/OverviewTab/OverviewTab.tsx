import React from "react";
import DashboardCompanyItems from "../DashboardCompanyItems/DashboardCompanyItems";
import CompaniInfoFullGrid from "../CompaniInfoFullGrid/CompaniInfoFullGrid";

export default function OverviewTab() {
  return (
    <>
      <div className="px-[16px]">
        <CompaniInfoFullGrid />
        <DashboardCompanyItems />
      </div>
    </>
  );
}

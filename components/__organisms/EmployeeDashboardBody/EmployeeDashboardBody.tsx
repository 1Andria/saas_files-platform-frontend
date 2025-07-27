import { useEmployeeDashboardTab } from "@/app/common/store/store";
import EmployeeDashboardHeader from "@/components/__moleculas/EmployeeDashboardHeader/EmployeeDashboardHeader";
import EmployeeDashboardNavigation from "@/components/__moleculas/EmployeeDashboardNavigation/EmployeeDashboardNavigation";
import EmployeeDashboardTabFile from "@/components/__moleculas/EmployeeDashboardTabFile/EmployeeDashboardTabFile";
import React from "react";

export default function EmployeeDashboardBody() {
  const activeTab = useEmployeeDashboardTab((state) => state.activeTab);
  return (
    <div className="min-h-[100vh] bg-gray-800">
      <div className="w-full border-b border-gray-700">
        <EmployeeDashboardHeader />
      </div>
      <div className="w-full border-b border-gray-700">
        <EmployeeDashboardNavigation />
      </div>
      {activeTab === "files" && <EmployeeDashboardTabFile />}
      {activeTab === "profile" && <h1>assd</h1>}
    </div>
  );
}

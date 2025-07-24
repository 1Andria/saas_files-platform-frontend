"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Building2, Users, FileText, Settings } from "lucide-react";
import { useDashboardTab } from "@/app/common/store/store";
export type Tab = "overview" | "employees" | "files" | "profile";

const tabs = [
  { id: "overview", label: "Overview", icon: Building2 },
  { id: "employees", label: "Employees", icon: Users },
  { id: "files", label: "Files", icon: FileText },
  { id: "profile", label: "Profile", icon: Settings },
] as const;

export default function DashboardNavigation() {
  const { activeTab, setActiveTab } = useDashboardTab();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab") as Tab | null;
    if (tabFromUrl && tabs.some((t) => t.id === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams, setActiveTab]);

  const handleTabClick = (tabId: Tab) => {
    setActiveTab(tabId);
    const newUrl = `?tab=${tabId}`;
    router.push(newUrl);
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <nav className=" max-w-[1340px] mx-auto bg-gray-800  px-6 pb-[2px]">
        <div className="flex space-x-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleTabClick(id)}
              className={`flex cursor-pointer items-center space-x-2 py-4 border-b-2 transition-colors ${
                activeTab === id
                  ? "border-blue-600 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

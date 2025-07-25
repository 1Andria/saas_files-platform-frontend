"use client";

import { axiosInstance } from "@/lib/axios-instance";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CompanyDashboardBody from "../CompanyDashboardBody/CompanyDashboardBody";
import EmployeeDashboardBody from "../EmployeeDashboardBody/EmployeeDashboardBody";
import { useUserInfo } from "@/app/common/store/store";

export default function Dashboard() {
  const user = useUserInfo((state) => state.user);
  const fetchUser = useUserInfo((state) => state.fetchUser);

  const [role, setRole] = useState<"company" | "employee" | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token") as string | null;

    if (!token) {
      router.push("/auth/registration");
      return;
    }

    const fetchAndSetUser = async () => {
      await fetchUser();
      const updatedUser = useUserInfo.getState().user;

      if (!updatedUser) {
        router.push("/auth/registration");
        return;
      }

      if ("companyName" in updatedUser) {
        setRole("company");
      } else if ("employeeEmail" in updatedUser) {
        setRole("employee");
      } else {
        setRole(null);
      }
    };

    fetchAndSetUser();
  }, []);

  if (!user || !role) {
    return <div className="text-white">Loading...</div>;
  }

  return role === "company" ? (
    <CompanyDashboardBody />
  ) : (
    <EmployeeDashboardBody />
  );
}

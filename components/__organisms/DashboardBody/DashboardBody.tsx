"use client";
import { axiosInstance } from "@/lib/axios-instance";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CompanyDashboardBody from "../CompanyDashboardBody/CompanyDashboardBody";
import EmployeeDashboardBody from "../EmployeeDashboardBody/EmployeeDashboardBody";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<"company" | "employee" | null>(null);
  const router = useRouter();

  useEffect(() => {
    const tokenFromCookie = getCookie("token") as string | null;
    if (!tokenFromCookie) {
      router.push("/auth/registration");
    } else {
      getUserData(tokenFromCookie);
    }
  }, []);

  const getUserData = async (token: string) => {
    try {
      const resp = await axiosInstance.get("/auth/current-user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = resp.data;
      setUser(data);

      if ("companyName" in data) {
        setRole("company");
      } else if ("employeeEmail" in data) {
        setRole("employee");
      } else {
        setRole(null);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      router.push("/auth/registration");
    }
  };

  if (!user || !role) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <>
      {role === "company" ? (
        <CompanyDashboardBody />
      ) : (
        <EmployeeDashboardBody />
      )}
    </>
  );
}

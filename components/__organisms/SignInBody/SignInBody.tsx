"use client";
import { CompanySignInForm } from "@/components/__moleculas/CompanySignInForm/CompanySignInForm";
import { EmployeeSignInForm } from "@/components/__moleculas/EmployeeSignInForm/EmployeeSignInForm";
import { Briefcase, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function SignInBody() {
  const [role, setRole] = useState<"company" | "employee" | null>(null);

  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
        <div className="bg-gray-800 p-10 rounded-2xl shadow-xl border border-gray-700 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-white mb-8">Sign In As</h1>
          <div className="space-y-4">
            <button
              onClick={() => setRole("company")}
              className="cursor-pointer flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-500 transition duration-200"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Company
            </button>
            <button
              onClick={() => setRole("employee")}
              className="cursor-pointer flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white rounded-lg text-lg font-medium hover:bg-green-500 transition duration-200"
            >
              <User className="w-5 h-5 mr-2" />
              Employee
            </button>
          </div>
          <div className="w-full mt-6 text-left">
            <Link
              href="/auth/registration"
              className="text-sm text-gray-400 hover:text-white transition duration-200 hover:underline"
            >
              ← Back to registration
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {role === "company" ? (
        <CompanySignInForm goBack={() => setRole(null)} />
      ) : (
        <EmployeeSignInForm goBack={() => setRole(null)} />
      )}
    </div>
  );
}

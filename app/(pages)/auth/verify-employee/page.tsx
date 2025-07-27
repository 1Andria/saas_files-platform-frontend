import VerifyEmployeeBody from "@/components/__organisms/VerifyEmployeeBody/VerifyEmployeeBody";
import React, { Suspense } from "react";

export default function VerifyEmployee() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <VerifyEmployeeBody />
    </Suspense>
  );
}

import React from "react";
import ProfileTabCompany from "../ProfileTabCompany/ProfileTabCompany";
import SubscriptionPlanBtn from "@/components/__atoms/SubscriptionPlanBtn/SubscriptionPlanBtn";
import DeleteCompanyBtn from "../DeleteCompanyBtn/DeleteCompanyBtn";

export default function CompanyProfileTab() {
  return (
    <>
      <ProfileTabCompany />
      <div className="px-[16px]">
        <SubscriptionPlanBtn />
      </div>
      <div className="w-full flex justify-center">
        <DeleteCompanyBtn />
      </div>
    </>
  );
}

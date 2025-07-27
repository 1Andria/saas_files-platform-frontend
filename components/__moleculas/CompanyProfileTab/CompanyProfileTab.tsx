import React from "react";
import ProfileTabCompany from "../ProfileTabCompany/ProfileTabCompany";
import SubscriptionPlanBtn from "@/components/__atoms/SubscriptionPlanBtn/SubscriptionPlanBtn";

export default function CompanyProfileTab() {
  return (
    <>
      <ProfileTabCompany />
      <div className="px-[16px]">
        <SubscriptionPlanBtn />
      </div>
    </>
  );
}

import React from "react";

export type HavingAccTypes = {
  mainTxt: string;
  linkTxt: string;
  linkTo?: string;
};

export default function HavingAcc({
  mainTxt,
  linkTxt,
  linkTo,
}: HavingAccTypes) {
  return (
    <>
      <p className="text-center text-sm text-gray-400 mt-6">
        {mainTxt}
        <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
          {linkTxt}
        </button>
      </p>
    </>
  );
}

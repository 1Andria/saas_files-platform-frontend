import React from "react";
import FileUploadBox from "../FileUploadBox/FileUploadBox";
import FilesForEmployee from "../FilesForEmployee/FilesForEmployee";

export default function EmployeeDashboardTabFile() {
  const filesRef = React.useRef<() => void>(() => {});

  return (
    <div className="max-w-[1340px] px-[16px] mx-auto pb-[40px]">
      <FileUploadBox onUploadSuccess={() => filesRef.current?.()} />
      <FilesForEmployee setFetcherRef={(fn) => (filesRef.current = fn)} />
    </div>
  );
}

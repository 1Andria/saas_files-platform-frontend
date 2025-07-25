import React from "react";
import { useUserInfo } from "@/app/common/store/store";
import { FileText } from "lucide-react";

export default function DashboardCompanyItems() {
  const user = useUserInfo((state) => state.user);

  const employees = user?.employees ?? [];
  const files = user?.files ?? [];
  console.log(employees);
  console.log(files);
  console.log(user);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1340px] mx-auto mt-10">
      <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Employees</h3>
        <div className="space-y-3">
          {employees.length > 0 ? (
            employees.map((employee: any) => (
              <div key={employee._id} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-400">
                    {employee.employeeEmail.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">
                    {employee.employeeEmail}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">
              No employees yet. Invite your first employee!
            </p>
          )}
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Files</h3>
        <div className="space-y-3">
          {files.length > 0 ? (
            files.map((file: any) => {
              const downloadUrl = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}/${file.fileId}`;
              const formattedDate = new Date(file.createdAt).toLocaleDateString(
                "en-GB",
                {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }
              );

              return (
                <a
                  key={file._id}
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3  p-2 rounded transition"
                >
                  <FileText className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-white underline underline-offset-2">
                      {file.fileName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {Math.ceil(file.size / 1024)} KB • {formattedDate}
                    </p>
                  </div>
                </a>
              );
            })
          ) : (
            <p className="text-gray-400 text-sm">No files uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

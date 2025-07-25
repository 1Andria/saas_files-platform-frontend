import React from "react";
import { User, Calendar, Trash2, FileText, Clock } from "lucide-react";

interface EmployeeCardProps {
  employee: any;
  onDelete: (id: string) => void;
}

export default function EmployeeCard({
  employee,
  onDelete,
}: EmployeeCardProps) {
  const formattedDate = new Date(employee.createdAt).toLocaleDateString(
    "en-GB",
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }
  );

  const isPending = employee.isActive === false;

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-700 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p
              className={`text-sm ${
                isPending ? "text-red-400" : "text-gray-400"
              }`}
            >
              {employee.employeeEmail}
            </p>

            {isPending && (
              <div className="flex items-center space-x-1 mt-1">
                <Clock className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-yellow-500">
                  Pending Invitation
                </span>
              </div>
            )}

            <div className="flex items-center space-x-1 mt-1">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">
                Joined {formattedDate}
              </span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <FileText className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">
                Uploaded Files: {employee.files?.length ?? 0}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(employee._id)}
          className="text-red-400 cursor-pointer hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

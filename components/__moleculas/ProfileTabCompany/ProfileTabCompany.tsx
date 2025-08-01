"use client";

import { useUserInfo } from "@/app/common/store/store";
import { axiosInstance } from "@/lib/axios-instance";
import { getCookie } from "cookies-next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { companyInfoSchema } from "@/validations/companyInfo.schema";
import { CountrySelect } from "../CountrySelect/CountrySelect";
import countries from "world-countries";

interface CompanyInfoInputs {
  companyName: string;
  companyCountry: string;
  companyIndustry: string;
}

export default function ProfileTabCompany() {
  const user = useUserInfo((state) => state.user);
  const fetchUser = useUserInfo((state) => state.fetchUser);
  const token = getCookie("token");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [isUpdatingCompany, setIsUpdatingCompany] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CompanyInfoInputs>({
    defaultValues: {
      companyName: user?.companyName || "",
      companyCountry: user?.companyCountry || "",
      companyIndustry: user?.companyIndustry || "",
    },
    resolver: yupResolver(companyInfoSchema),
  });

  const watched = watch();

  const formattedCountries = useMemo(() => {
    return countries.map((country) => ({
      label: country.name.common,
      value: country.cca2,
    }));
  }, []);

  const hasChanges = useMemo(() => {
    return (
      watched.companyName !== user?.companyName ||
      watched.companyCountry !== user?.companyCountry ||
      watched.companyIndustry !== user?.companyIndustry
    );
  }, [watched, user]);

  const onSubmit = async (data: CompanyInfoInputs) => {
    setIsUpdatingCompany(true);
    try {
      const resp = await axiosInstance.patch(
        `/company/${user?._id}`,
        {
          name: data.companyName,
          country: data.companyCountry,
          industry: data.companyIndustry,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.status === 200 || resp.status === 201) {
        toast.success("Updated successfully");
        await fetchUser();
      }
    } catch (e: any) {
      const msg = e.response?.data?.message;
      if (typeof msg === "string") toast.error(msg);
      else if (Array.isArray(msg)) msg.forEach((m: string) => toast.error(m));
    } finally {
      setIsUpdatingCompany(false);
    }
  };

  const handleReset = () => {
    reset({
      companyName: user?.companyName || "",
      companyCountry: user?.companyCountry || "",
      companyIndustry: user?.companyIndustry || "",
    });
  };

  const handlePasswordChange = async (e: any) => {
    e.preventDefault();
    setIsChangingPassword(true);
    try {
      const resp = await axiosInstance.patch(
        `/company/change-password`,
        { currentPassword, newPassword, repeatNewPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.status === 200 || resp.status === 201) {
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
        await fetchUser();
      }
    } catch (e: any) {
      const msg = e.response?.data?.message;
      if (typeof msg === "string") toast.error(msg);
      else if (Array.isArray(msg)) msg.forEach((m: string) => toast.error(m));
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="px-[16px] mx-auto max-w-[1340px] mt-[16px]">
      <h2 className="text-2xl font-bold text-white mb-6">Company Profile</h2>
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 space-y-6 mb-8 lg:mb-0"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Company Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Company Name
              </label>
              <input
                {...register("companyName")}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
              {errors.companyName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Company Email
              </label>
              <input
                type="email"
                value={user?.companyEmail}
                readOnly
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white opacity-60 cursor-not-allowed"
              />
            </div>

            <div>
              <CountrySelect
                control={control}
                name="companyCountry"
                label="Country"
                countries={formattedCountries}
                error={!!errors.companyCountry}
              />

              {errors.companyCountry && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.companyCountry.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Industry
              </label>
              <input
                {...register("companyIndustry")}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
              {errors.companyIndustry && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.companyIndustry.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={!hasChanges || isUpdatingCompany}
              className={`bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center
    ${
      hasChanges && !isUpdatingCompany
        ? "hover:bg-blue-700 cursor-pointer"
        : "opacity-50 cursor-not-allowed"
    }`}
            >
              {isUpdatingCompany ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Updating...
                </span>
              ) : (
                "Confirm Changes"
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={!hasChanges}
              className={`border border-gray-600 text-gray-300 px-6 py-2 rounded-lg transition-colors ${
                hasChanges
                  ? "hover:bg-gray-700 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              Cancel
            </button>
          </div>
        </form>

        <form
          onSubmit={handlePasswordChange}
          className="flex-1 bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 space-y-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Change Password
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                placeholder="••••••••"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={repeatNewPassword}
                onChange={(e) => setRepeatNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isChangingPassword}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChangingPassword ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Updating...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

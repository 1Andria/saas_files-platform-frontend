"use client";
import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import countries from "world-countries";
import { toast } from "sonner";

import { signUpSchema } from "@/validations/sign-up.schema";
import { axiosInstance } from "@/lib/axios-instance";
import { useCompanyEmail } from "@/app/common/store/store";
import { FormValues } from "@/app/common/types/types";
import { ShieldCheck, Building2, Mail, Lock, Briefcase } from "lucide-react";
import { LabeledInput } from "@/components/__moleculas/LabledInput/LabledInput";
import { Label } from "@/components/__atoms/Label/Label";
import { Button } from "@/components/__atoms/Button/Button";
import { CountrySelect } from "@/components/__moleculas/CountrySelect/CountrySelect";
import { IndustrySelect } from "@/components/__moleculas/IndustrySelect/IndustrySelect";
import HavingAcc from "@/components/__atoms/HavingAcc/HavingAcc";

export default function SignUpBody() {
  const router = useRouter();
  const setCompanyEmail = useCompanyEmail((state) => state.setCompanyEmail);

  const formattedCountries = useMemo(() => {
    return countries.map((country) => ({
      label: country.name.common,
      value: country.cca2,
    }));
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async ({
    companyName,
    email,
    password,
    country,
    industry,
  }: FormValues) => {
    try {
      const resp = await axiosInstance.post("/auth/sign-up", {
        name: companyName,
        email,
        password,
        industry,
        country,
      });

      if (resp.status === 201) {
        setCompanyEmail(email);
        toast.success("OTP code sent successfully");
        router.push("/auth/verify-company-email");
        return;
      }

      toast.error(resp.data.message);
    } catch (e: any) {
      if (typeof e.response.data.message === "string") {
        toast.error(e.response.data.message);
      }
      if (Array.isArray(e.response.data.message)) {
        toast.error(e.response.data.message.map((m: string) => m).join("\n"));
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#1f2937] min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              Create Company Account
            </h1>
            <p className="text-gray-400 mt-2">
              Start managing your team's files securely
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <LabeledInput
              label="Company Name"
              icon={<Building2 className="w-5 h-5" />}
              placeholder="Acme Corporation"
              {...register("companyName")}
              error={!!errors.companyName}
            />

            <LabeledInput
              label="Email Address"
              icon={<Mail className="w-5 h-5" />}
              placeholder="example@gmail.com"
              type="email"
              {...register("email")}
              error={!!errors.email}
            />

            <LabeledInput
              label="Password"
              icon={<Lock className="w-5 h-5" />}
              placeholder="••••••••"
              type="password"
              {...register("password")}
              error={!!errors.password}
            />

            <CountrySelect
              control={control}
              name="country"
              label="Country"
              countries={formattedCountries}
              error={!!errors.country}
            />

            <IndustrySelect register={register} error={!!errors.industry} />
            <Button type="submit">Create Account</Button>
          </form>
          <HavingAcc
            mainTxt="Already have an account?"
            linkTxt="Sign in here"
            linkTo="/auth/sign-in"
          />
        </div>
      </div>
    </div>
  );
}

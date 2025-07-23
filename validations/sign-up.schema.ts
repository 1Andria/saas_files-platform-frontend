import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .max(20, "Maximum 20 characters")
    .required("Password is required"),
  country: Yup.string().required("Country is required"),
  industry: Yup.string().required("Industry is required"),
});

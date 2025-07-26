import * as yup from "yup";

export const companyInfoSchema = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  companyCountry: yup.string().required("Select a country"),
  companyIndustry: yup.string().required("Industry is required"),
});

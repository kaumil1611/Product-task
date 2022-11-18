import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signInSchemas = Yup.object({
  email: Yup.string().email().required("Please Enter Your Email"),
  password: Yup.string()
    .required("Please Enter Your Password")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(8, "Must be exactly 8 digits")
    .max(8, "Must be exactly 8 digits"),
});

export const signUpSchemas = Yup.object({
  name: Yup.string().min(2).max(10).required("Please Enter Your Name"),
  email: Yup.string().email().required("Please Enter Your Email"),
  password: Yup.string()
    .required("Please Enter Your Password")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(8, "Must be exactly 8 digits")
    .max(8, "Must be exactly 8 digits"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Please Enter Your Phone number"),
});

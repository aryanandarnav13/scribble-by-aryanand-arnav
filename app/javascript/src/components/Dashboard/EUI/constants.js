import * as yup from "yup";

export const LOGIN_SCHEMA = yup.object().shape({
  password: yup.string().required("Password Can't be blank"),
});

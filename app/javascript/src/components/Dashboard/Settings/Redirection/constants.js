import * as yup from "yup";

export const REDIRECTION_ITEMS = [
  {
    from: "localhost:3000",
    to: "localhost:3000/articles",
    isEdit: false,
  },
  {
    from: "localhost:3000/create",
    to: "localhost:3000/create/articles",
    isEdit: true,
  },
];

export const TABLE_HEADER = ["FROM PATH", "TO PATH", "ACTIONS"];

export const REDIRECTION_VALIDATION_SCHEMA = yup.object().shape({
  from: yup
    .string()
    .required("From path is required")
    .matches(/^(?!\/\/)^(?!(^[a-zA-Z0-9\s]))/, "Invalid from path"),
  to: yup
    .string()
    .required("From path is required")
    .matches(/^(?!\/\/)^(?!(^[a-zA-Z0-9\s]))/, "Invalid to path"),
});

import * as yup from "yup";

export const CATEGORIES_FORM_INITIAL_FORM_VALUES = {
  name: "",
  userId: "",
};

export const CATEGORIES_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "Title must contain only alphanumeric characters"
    ),
});

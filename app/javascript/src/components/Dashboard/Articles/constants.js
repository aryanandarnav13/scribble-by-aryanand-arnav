import * as yup from "yup";

export const camelize = value =>
  value
    .toLowerCase()
    .split(/[-_,./:\s]/g)
    .reduce(
      (word, character) =>
        word + (character.charAt(0).toUpperCase() + character.slice(1))
    );

export const ARTICLE_INITIAL_VALUES = {
  title: "",
  category_id: null,
  status: "",
  body: "",
};

export const CATEGORY_INITIAL_VALUES = { name: "", user_id: null };

export const filterItems = {
  title: true,
  category: true,
  date: true,
  author: true,
  status: true,
};

export const ARTICLE_VALIDATION_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .matches(/^[\w\-\s]+$/, "Title must contain only alphanumeric characters"),
  body: yup.string().required("Body is required"),
  category: yup.object().required("Required").nullable(),
});

export const CATEGORY_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required"),
});

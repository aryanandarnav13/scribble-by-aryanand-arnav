import * as yup from "yup";

import { renderIcon } from "./TableElement";

const camelize = value =>
  value
    .toLowerCase()
    .split(/[-_,./:\s]/g)
    .reduce(
      (word, character) =>
        word + (character.charAt(0).toUpperCase() + character.slice(1))
    );

const buildSelectOptions = selectOptions =>
  selectOptions.map(selectOption => ({
    label: selectOption,
    value: camelize(selectOption),
  }));

export const FORM_INITIAL_VALUES = {
  title: "",
  category: null,
  body: "",
};

export const CATEGORIES = buildSelectOptions(["Getting Started", "Misc"]);

export const VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Body is required"),
  category: yup
    .object()
    .nullable()
    .shape({
      label: yup.string().oneOf(CATEGORIES.map(category => category.label)),
      value: yup.string().oneOf(CATEGORIES.map(category => category.value)),
    })
    .required("Category is required"),
});

export const buildArticleTableColumnData = () => [
  {
    dataIndex: "title",
    key: "title",
    title: "Title",
    width: "20%",
  },
  {
    dataIndex: "date",
    key: "date",
    title: "DATE",
    width: "20%",
  },
  {
    title: "AUTHOR",
    dataIndex: "author",
    key: "author",
    width: "20%",
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
    width: "20",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    width: "20",
  },
  {
    title: "",
    dataIndex: "more",
    key: "more",
    width: "20",
    render: renderIcon,
  },
];

export const ROW_DATA = [
  {
    title: "Welcome to Scribble",
    role: "owner",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting Started",
    status: "Draft",
    id: 1,
  },
  {
    title: "Welcome to Scribble",
    role: "owner",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting Started",
    status: "Draft",
    id: 1,
  },
  {
    title: "Welcome to Scribble",
    role: "owner",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting Started",
    status: "Draft",
    id: 1,
  },
  {
    title: "Welcome to Scribble",
    role: "owner",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting Started",
    status: "Draft",
    id: 1,
  },
  {
    title: "Welcome to Scribble",
    role: "owner",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting Started",
    status: "Draft",
    id: 1,
  },
  {
    title: "Welcome to Scribble",
    role: "owner",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting Started",
    status: "Draft",
    id: 1,
  },
  {
    title: "Welcome to Scribble",
    role: "owner",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting Started",
    status: "Draft",
    id: 1,
  },
  {
    title: "Welcome to Scribble",
    role: "owner",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting Started",
    status: "Draft",
    id: 1,
  },
  {
    title: "Welcome to Scribble",
    role: "owner",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting Started",
    status: "Draft",
    id: 1,
  },
  {
    title: "Welcome to Scribble",
    role: "owner",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting Started",
    status: "Draft",
    id: 1,
  },
  {
    title: "Welcome to Scribble",
    role: "owner",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting Started",
    status: "Draft",
    id: 1,
  },
  {
    title: "Welcome to Scribble",
    role: "owner",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting Started",
    status: "Draft",
    id: 1,
  },
  {
    title: "Welcome to Scribble",
    role: "owner",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "Getting Started",
    status: "Draft",
    id: 1,
  },
];

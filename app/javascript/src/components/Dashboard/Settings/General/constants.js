import * as yup from "yup";

export const siteSchema = ({ isPasswordInputDisabled, passwordEnabled }) =>
  yup.object().shape({
    name: yup.string().required("Please Enter a Site name"),

    password:
      isPasswordInputDisabled && !passwordEnabled
        ? yup
            .string()
            .min(6, "Require atleast 6 character")
            .matches(
              /(?=.*?[0-9])(?=.*?[A-Za-z]).+/,
              "Requires atleast 1 number and letter"
            )
            .when("password_enabled", {
              is: true,
              then: yup.string().required("Please enter password"),
            })
        : yup.string().notRequired(),
  });

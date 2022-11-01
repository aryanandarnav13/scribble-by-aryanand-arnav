import React from "react";

import { Check, Close } from "neetoicons";
import { Typography, Input, Button } from "neetoui";

export const PasswordForm = ({
  isPasswordInputDisabled,
  setIsPasswordInputDisabled,
  password,
  handlePassword,
  passwordValidation,
  setFieldValue,
  errors,
}) => (
  <div>
    <div className="flex gap-3 px-1">
      <Input
        className="mt-5"
        disabled={isPasswordInputDisabled}
        error={errors.password}
        label="Password"
        type="password"
        value={password}
        onChange={e => {
          handlePassword(e);
          setFieldValue("password", e.target.value);
        }}
      />
      <Button
        className="mt-10 h-8"
        label="Enter Password"
        size="small"
        style="secondary"
        onClick={() => setIsPasswordInputDisabled(false)}
      />
    </div>
    <Typography className="flex py-3" style="body3">
      {passwordValidation.minChar ? (
        <Check color="#008000" size={18} />
      ) : (
        <Close color="#FF0000" size={16} />
      )}
      Have atleast 6 characters
    </Typography>
    <Typography className="flex" style="body3">
      {passwordValidation.letterAndNumber ? (
        <Check color="#008000" size={20} />
      ) : (
        <Close color="#FF0000" size={18} />
      )}
      Include at least 1 letter and 1 number{" "}
    </Typography>
  </div>
);

import React from "react";

import { Input, Button } from "neetoui";

export const PasswordForm = ({
  passwordFocus,
  isPasswordInputDisabled,
  setIsPasswordInputDisabled,
  password,
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
        placeholder="**********"
        ref={passwordFocus}
        type="password"
        value={password}
        onChange={e => {
          setFieldValue("password", e.target.value);
        }}
      />
      <Button
        className="mt-10 h-8"
        label="Enter Password"
        size="small"
        style="secondary"
        onClick={() => {
          setIsPasswordInputDisabled(false);
        }}
      />
    </div>
  </div>
);

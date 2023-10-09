import React, { Fragment, useState } from "react";
import Input from "./Input";
import { IconEyeClose } from "../icon";
import { IconEyeOpen } from "../icon";

const InputPassword = ({ control }) => {
  const [hidePassword, setHidePassword] = useState(true);
  if (!control) return null;
  return (
    <Fragment>
      <Input
        type={hidePassword ? "password" : "text"}
        name="password"
        placeholder="Enter your password"
        control={control}
      >
        {hidePassword ? (
          <IconEyeOpen
            className="input-icon"
            onClick={() => setHidePassword(false)}
          ></IconEyeOpen>
        ) : (
          <IconEyeClose
            className="input-icon"
            onClick={() => setHidePassword(true)}
          ></IconEyeClose>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPassword;

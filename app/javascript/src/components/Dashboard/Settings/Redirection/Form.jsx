import React from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Input, Button } from "@bigbinary/neetoui";

export const Form = ({
  handleCheck,
  redirectionDetails,
  setRedirectionDetails,
}) => {
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value.split(" ").join("");
    setRedirectionDetails(details => ({ ...details, [name]: value }));
  };

  return (
    <tr className="border-b-8 border-indigo-100 bg-white">
      <td className="p-2">
        <Input
          name="frompath"
          value={redirectionDetails.frompath}
          onChange={handleChange}
        />
      </td>
      <td>
        <Input
          name="topath"
          value={redirectionDetails.topath}
          onChange={handleChange}
        />
      </td>
      <td>
        <Button
          className="ml-8"
          icon={Check}
          style="text"
          onClick={handleCheck}
        />
      </td>
    </tr>
  );
};

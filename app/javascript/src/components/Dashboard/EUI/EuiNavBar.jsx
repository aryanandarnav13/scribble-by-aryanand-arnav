import React, { useEffect } from "react";

import { Keyboard } from "neetoicons";
import { Typography } from "neetoui";

const EuiNavBar = ({ siteName, setShowModal, showModal }) => {
  const keysPressed = {};
  const handleShortcuts = event => {
    keysPressed[event.key] = true;
    if ((keysPressed["Control"] || keysPressed["Meta"]) && event.key === "k") {
      if (!showModal) {
        event.preventDefault();
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }

    if (event.code === "Escape" && showModal) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleShortcuts);

    return () => {
      window.removeEventListener("keydown", handleShortcuts);
    };
  }, [showModal]);

  return (
    <div className="border max-w-7xl sticky top-0 mx-auto flex h-20 bg-white px-4">
      <div
        className="border absolute mt-6 flex w-1/5 border-gray-500 p-2 text-gray-500"
        tabIndex="0"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Search for articles here.
        <Keyboard className="ml-auto" size={16} /> K
      </div>
      <Typography className="m-auto" style="h3">
        {siteName}
      </Typography>
    </div>
  );
};
export default EuiNavBar;

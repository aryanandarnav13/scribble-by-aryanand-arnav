import { createConsumer } from "@rails/actioncable";

import { getFromLocalStorage } from "utils/storage";

const buildWebsocketURL = () => {
  const currentUserEmail = getFromLocalStorage("currentUser");

  return encodeURI(`/cable?auth_email=${currentUserEmail}`);
};

export default () => createConsumer(buildWebsocketURL());

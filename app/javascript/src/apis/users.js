import axios from "axios";

const list = () => axios.get("/users");

const userApi = {
  list,
};

export default userApi;

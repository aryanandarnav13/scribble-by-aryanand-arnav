import axios from "axios";

const list = () => axios.get("/api/users");

const userApi = {
  list,
};

export default userApi;

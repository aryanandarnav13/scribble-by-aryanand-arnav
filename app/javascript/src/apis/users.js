import axios from "axios";

const list = () => axios.get("/api/users");

const usersApi = {
  list,
};

export default usersApi;

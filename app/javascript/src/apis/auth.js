import axios from "axios";

const login = payload => axios.post("/api/session", payload);
const authApi = {
  login,
};

export default authApi;

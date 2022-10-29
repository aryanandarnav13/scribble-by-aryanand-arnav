import axios from "axios";

const show = () => axios.get("/website");
const update = payload => axios.put("/website", payload);

const siteApi = {
  show,
  update,
};

export default siteApi;

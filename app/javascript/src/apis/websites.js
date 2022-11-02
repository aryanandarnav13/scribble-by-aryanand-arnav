import axios from "axios";

const list = () => axios.get("/website");

const update = ({ payload }) => axios.put("/website", { website: payload });

const websiteApi = {
  list,
  update,
};
export default websiteApi;

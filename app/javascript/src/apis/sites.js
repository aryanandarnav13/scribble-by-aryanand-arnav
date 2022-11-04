import axios from "axios";

const list = () => axios.get("/site");

const update = ({ payload }) => axios.put("/site", { site: payload });

const siteApi = {
  list,
  update,
};
export default siteApi;

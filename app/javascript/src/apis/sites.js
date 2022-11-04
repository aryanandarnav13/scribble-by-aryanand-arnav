import axios from "axios";

const list = () => axios.get("/api/site");

const update = ({ payload }) => axios.put("/api/site", { site: payload });

const siteApi = {
  list,
  update,
};
export default siteApi;

import axios from "axios";

const show = () => axios.get("/site");
const update = payload => axios.put("/site", payload);

const websiteApi = {
  show,
  update,
};

export default websiteApi;

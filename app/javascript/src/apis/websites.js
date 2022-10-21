import axios from "axios";

const show = () => axios.get("/websites");
const update = payload => axios.put("/websites", payload);

const websiteApi = {
  show,
  update,
};

export default websiteApi;

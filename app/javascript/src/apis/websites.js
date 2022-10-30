import axios from "axios";

const get = () => axios.get("/websites");

const update = ({ id, payload }) =>
  axios.put(`/websites/${id}`, { website: payload });

const websiteApi = {
  get,
  update,
};
export default websiteApi;

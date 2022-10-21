import axios from "axios";

const show = id => axios.get(`/websites/${id}`);
const update = ({ id, payload }) =>
  axios.put(`/websites/${id}`, {
    website: payload,
  });

const websiteApi = {
  show,
  update,
};

export default websiteApi;

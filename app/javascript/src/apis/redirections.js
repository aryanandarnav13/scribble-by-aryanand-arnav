import axios from "axios";

const create = payload => axios.post("/api/redirections", payload);
const list = () => axios.get("/api/redirections");

const show = id => axios.get(`/api/redirections/${id}`);

const update = ({ id, payload }) =>
  axios.put(`/api/redirections/${id}`, payload);

const destroy = id => axios.delete(`/api/redirections/${id}`);

const redirectionApi = {
  create,
  list,
  show,
  update,
  destroy,
};

export default redirectionApi;

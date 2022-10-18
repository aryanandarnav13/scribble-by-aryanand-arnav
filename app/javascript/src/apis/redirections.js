import axios from "axios";

const create = payload => axios.post("/redirections", payload);
const list = () => axios.get("/redirections");

const show = id => axios.get(`/redirections/${id}`);

const update = ({ id, payload }) => axios.put(`/redirections/${id}`, payload);

const destroy = id => axios.delete(`/redirections/${id}`);

const redirectionApi = {
  create,
  list,
  show,
  update,
  destroy,
};

export default redirectionApi;

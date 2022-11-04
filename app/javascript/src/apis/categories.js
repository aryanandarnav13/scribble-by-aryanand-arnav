import axios from "axios";

const list = () => axios.get("/api/categories");

const create = payload =>
  axios.post("/api/categories", {
    category: payload,
  });

const show = id => axios.get(`/api/categories/${id}`);

const update = ({ id, payload }) =>
  axios.put(`/api/categories/${id}`, {
    category: payload,
  });

const destroy = (id, payload) =>
  axios.delete(`/api/categories/${id}`, { data: { category: payload } });

const categoriesApi = {
  create,
  list,
  show,
  update,
  destroy,
};

export default categoriesApi;

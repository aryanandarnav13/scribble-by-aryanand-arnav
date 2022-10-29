import axios from "axios";

const list = () => axios.get("/categories");

const create = payload =>
  axios.post("/categories", {
    category: payload,
  });

const show = id => axios.get(`/categories/${id}`);

const update = ({ id, payload }) =>
  axios.put(`/categories/${id}`, {
    category: payload,
  });

const destroy = (id, payload) =>
  axios.delete(`/categories/${id}`, { data: { category: payload } });

const categoriesApi = {
  create,
  list,
  show,
  update,
  destroy,
};

export default categoriesApi;

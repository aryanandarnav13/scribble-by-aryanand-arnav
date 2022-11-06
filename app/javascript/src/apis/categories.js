import axios from "axios";

const list = () => axios.get("/api/categories");

const create = payload =>
  axios.post("/api/categories", {
    payload,
  });

const show = id => axios.get(`/api/categories/${id}`);

const update = ({ payload }) =>
  axios.put(`/api/categories`, {
    payload,
  });

const reorder = ({ payload }) =>
  axios.patch(`/api/categories/reorder`, {
    payload,
  });

const destroy = ({ payload }) =>
  axios.delete(
    `/api/categories/${payload.id}?new_category_id=${payload.new_category_id}`
  );

const categoriesApi = {
  create,
  list,
  show,
  update,
  reorder,
  destroy,
};

export default categoriesApi;

import axios from "axios";

const list = payload => axios.get("/api/articles", { params: payload });

const create = payload =>
  axios.post("/api/articles", {
    article: payload,
  });

const show = id => axios.get(`/api/articles/${id}`);

const update = (id, payload) =>
  axios.put(`/api/articles/${id}`, {
    article: payload,
  });

const reorder = (id, payload) =>
  axios.patch(`/api/articles/${id}/reorder`, {
    article: payload,
  });

const destroy = id => axios.delete(`/api/articles/${id}`);

const transfer = payload =>
  axios.patch(
    `/api/articles/${payload.article_ids}/transfer/?new_category_id=${payload.new_category_id}`
  );

const articlesApi = {
  create,
  list,
  show,
  transfer,
  update,
  reorder,
  destroy,
};

export default articlesApi;

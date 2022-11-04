import axios from "axios";

const list = payload => axios.get("/api/articles", { params: payload });

const create = payload =>
  axios.post("/api/articles", {
    article: payload,
  });

const show = slug => axios.get(`/api/articles/${slug}`);

const update = (slug, payload) =>
  axios.put(`/articles/${slug}`, {
    article: payload,
  });

const destroy = slug => axios.delete(`/api/articles/${slug}`);

const articlesApi = {
  create,
  list,
  show,
  update,
  destroy,
};

export default articlesApi;

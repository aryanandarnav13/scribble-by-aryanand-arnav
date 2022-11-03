import axios from "axios";

const list = payload => axios.get("/articles", { params: payload });

const create = payload =>
  axios.post("/articles", {
    article: payload,
  });

const show = slug => axios.get(`/articles/${slug}`);

const update = (slug, payload) =>
  axios.put(`/articles/${slug}`, {
    article: payload,
  });

const destroy = slug => axios.delete(`/articles/${slug}`);

const articlesApi = {
  create,
  list,
  show,
  update,
  destroy,
};

export default articlesApi;

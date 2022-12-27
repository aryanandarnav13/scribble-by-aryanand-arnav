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
  axios.patch(`/api/articles/${id}/reorder`, payload);

const destroy = id => axios.delete(`/api/articles/${id}`);

const transfer = payload => axios.patch(`/api/articles/transfer`, payload);

const generatePdf = () => axios.post("/api/articles/report", {});

const download = () =>
  axios.get("/api/articles/report/download", { responseType: "blob" });

const articlesApi = {
  create,
  list,
  show,
  transfer,
  update,
  reorder,
  destroy,
  generatePdf,
  download,
};

export default articlesApi;

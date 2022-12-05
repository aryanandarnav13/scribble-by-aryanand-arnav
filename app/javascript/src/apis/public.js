import axios from "axios";

const listCategories = () => axios.get("/api/public/categories");

const listArticles = payload =>
  axios.get("/api/public/articles", { params: payload });

const show = slug => axios.get(`/api/public/articles/${slug}`);

const publicApi = {
  listCategories,
  listArticles,
  show,
};

export default publicApi;

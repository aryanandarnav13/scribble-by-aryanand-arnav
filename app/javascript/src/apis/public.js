import axios from "axios";

const listCategories = () => axios.get("/api/public/categories");

const listArticles = () => axios.get("/api/public/articles");

const show = slug => axios.get(`/api/public/articles/${slug}`);

const publicApi = {
  listCategories,
  listArticles,
  show,
};

export default publicApi;

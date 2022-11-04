import axios from "axios";

const listCategories = () => axios.get("/api/public/categories");

const listArticles = () => axios.get("/api/public/articles");

const publicApi = {
  listCategories,
  listArticles,
};

export default publicApi;

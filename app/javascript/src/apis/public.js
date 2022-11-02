import axios from "axios";

const listCategories = () => axios.get("/public/categories");

const listArticles = () => axios.get("/public/articles");

const publicApi = {
  listCategories,
  listArticles,
};

export default publicApi;

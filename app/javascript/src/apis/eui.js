import axios from "axios";

const listCategories = () => axios.get("/eui/categories");

const listArticles = () => axios.get("/eui/articles");

const euiApi = {
  listCategories,
  listArticles,
};

export default euiApi;

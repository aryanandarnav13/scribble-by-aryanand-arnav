import axios from "axios";

const listCategories = () => axios.get("/api/public/categories");

const publicCategoriesApi = {
  listCategories,
};

export default publicCategoriesApi;

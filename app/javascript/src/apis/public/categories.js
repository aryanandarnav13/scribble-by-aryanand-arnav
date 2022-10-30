import axios from "axios";

const list = () => axios.get("/public/categories");

const publicCategoryApi = {
  list,
};

export default publicCategoryApi;

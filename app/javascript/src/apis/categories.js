import axios from "axios";

const list = () => axios.get("/categories");

const create = payload =>
  axios.post("/categories", {
    article: payload,
  });

const categoriesApi = {
  create,
  list,
};

export default categoriesApi;

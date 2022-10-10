import axios from "axios";

const list = () => axios.get("/categories");

const create = payload => axios.post("/categories", payload);

const categoriesApi = { list, create };

export default categoriesApi;

import axios from "axios";

const listArticles = payload =>
  axios.get("/api/public/articles", { params: payload });

const show = slug => axios.get(`/api/public/articles/${slug}`);

const publicArticlesApi = {
  listArticles,
  show,
};

export default publicArticlesApi;

import axios from "axios";

const list = () => axios.get("/public/articles");

const publicArticleApi = {
  list,
};

export default publicArticleApi;

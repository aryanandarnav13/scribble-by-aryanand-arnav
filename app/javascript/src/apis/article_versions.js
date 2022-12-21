import axios from "axios";

const update = ({ id, versionAt, restoredAt }) =>
  axios.patch(`/api/article_versions/${id}`, {
    version_at: versionAt,
    restored_at: restoredAt,
  });

const articleVersionsApi = {
  update,
};

export default articleVersionsApi;

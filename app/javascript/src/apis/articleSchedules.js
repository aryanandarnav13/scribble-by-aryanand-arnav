import axios from "axios";

const list = id => axios.get(`/api/article_schedules`, { params: { id } });

const create = ({ id, payload }) =>
  axios.post(`/api/article_schedules`, {
    id,
    schedule_at: payload.schedule_at,
    status: payload.status,
  });

const destroy = id => axios.delete(`/api/article_schedules/${id}`);

const articleSchedulesApi = {
  list,
  create,
  destroy,
};

export default articleSchedulesApi;

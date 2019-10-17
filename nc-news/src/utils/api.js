const axios = require("axios");

const request = axios.create({
  baseURL: "https://nc-news-jamesteh.herokuapp.com/api"
});

exports.getAllTopics = async () => {
  const { data } = await request.get("/topics");
  return data.topics;
};

exports.getArticles = async (topic, sort_by, order, author, p) => {
  const { data } = await request.get("/articles", {
    params: { topic, sort_by, order, author, p }
  });
  return data;
};

exports.getArticle = async uri => {
  const { data } = await request.get(uri);
  return data.article;
};
exports.getComments = async (uri, p) => {
  const { data } = await request.get(`${uri}/comments`, { params: { p } });
  return data.comments;
};
exports.PostComment = async (body, username, uri) => {
  await request.post(`${uri}/comments`, { username, body });
};
exports.delete = async (id, type) => {
  await request.delete(`/${type}/${id}`);
};
exports.incVotes = async (type, id, inc_votes) => {
  await request.patch(`/${type}/${id}`, { inc_votes });
};

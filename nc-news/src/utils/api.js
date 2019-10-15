const axios = require("axios");

const request = axios.create({
  baseURL: "https://nc-news-jamesteh.herokuapp.com/api"
});

exports.getAllTopics = async () => {
  const { data } = await request.get("/topics");
  return data.topics;
};

exports.getArticles = async topic => {
  const { data } = await request.get("/articles", { params: { topic } });
  return data;
};

exports.getArticle = async uri => {
  const { data } = await request.get(uri);
  return data.article;
};
exports.getComments = async uri => {
  const { data } = await request.get(`${uri}/comments`);
  return data.comments;
};

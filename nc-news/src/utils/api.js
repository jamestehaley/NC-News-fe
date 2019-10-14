const axios = require("axios");

const request = axios.create({
  baseURL: "https://nc-news-jamesteh.herokuapp.com/api"
});

exports.getAllTopics = async () => {
  const { data } = await request.get("/topics");
  return data.topics;
};

exports.getArticles = async () => {
  const { data } = await request.get("/articles");
  return data.articles;
};
